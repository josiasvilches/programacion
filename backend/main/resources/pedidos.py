from flask_restful import Resource
from flask import request, jsonify
from main.auth.decorators import role_required
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import db
from datetime import datetime
from main.models import PedidoModel, PedidoProductoModel, UsuarioModel

class Pedidos(Resource):
    def get(self):
        # Página inicial por defecto
        page = 1
        # Cantidad de elementos por página
        per_page = 10

        pedidos = db.session.query(PedidoModel)

        # Paginación del request si está especificada
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Filtrar por fecha del pedido
        if request.args.get('fecha'):
            pedidos = pedidos.filter(PedidoModel.fecha_pedido.like("%"+request.args.get('fecha')+"%"))
        # Filtrar por estado del pedido
        if request.args.get('estado'):
            pedidos = pedidos.filter(PedidoModel.estado_pedido == request.args.get('estado'))
        # Filtrar por el método de pago
        if request.args.get('metodo_pago'):
            pedidos = pedidos.filter(PedidoModel.metodo_pago == request.args.get('metodo_pago'))
        # Filtrar por el cliente
        if request.args.get('usuario'):
            pedidos = pedidos.outerjoin(PedidoModel.cliente).filter(UsuarioModel.nombre == request.args.get('usuario'))
        # Ordenar por fecha más reciente primero
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=True)
        return jsonify({'pedidos': [pedido.to_json() for pedido in pedidos],
                        'total': pedidos.total,
                        'pages': pedidos.pages,
                        'page':page})

    @jwt_required()
    def post(self):
        data = request.get_json() or {}

        if not all(key in data for key in ['id_cliente', 'estado_pedido', 'metodo_pago', 'productos']):
            return {"mensaje": "Faltan campos requeridos: 'id_cliente', 'estado_pedido', 'metodo_pago', 'productos'"}, 400

        productos = data['productos']
        if not isinstance(productos, list) or not productos:
            return {"mensaje": "El campo 'productos' debe ser una lista con al menos un producto"}, 400

        try:
            total = sum(p['subtotal'] for p in productos)

            # Procesar fecha_pedido: si viene en data, parsearla; sino usar datetime.now()
            fecha_pedido = datetime.now()
            if 'fecha_pedido' in data and data['fecha_pedido']:
                try:
                    # Intentar parsear la fecha en formato ISO (YYYY-MM-DD o YYYY-MM-DDTHH:MM:SS)
                    fecha_pedido = datetime.fromisoformat(data['fecha_pedido'].replace('Z', '+00:00'))
                except ValueError:
                    # Si falla, intentar otros formatos comunes
                    try:
                        fecha_pedido = datetime.strptime(data['fecha_pedido'], '%Y-%m-%d')
                    except ValueError:
                        try:
                            fecha_pedido = datetime.strptime(data['fecha_pedido'], '%d/%m/%Y')
                        except ValueError:
                            # Si todos los formatos fallan, usar datetime.now()
                            fecha_pedido = datetime.now()

            nuevo_pedido = PedidoModel(
                id_cliente=data['id_cliente'],
                fecha_pedido=fecha_pedido,
                estado_pedido=data['estado_pedido'],
                metodo_pago=data['metodo_pago'],
                total=total,
                hora_retiro=data.get('hora_retiro')  # Acepta hora_retiro como string opcional
            )
            db.session.add(nuevo_pedido)
            db.session.flush()  # Obtener el ID del pedido antes del commit

            for p in productos:
                pedido_producto = PedidoProductoModel(
                    id_pedido=nuevo_pedido.pedido_id,
                    id_producto=p['id_producto'],
                    cantidad=p['cantidad'],
                    precio_unitario=p['precio_unitario'],
                    subtotal=p['subtotal']
                )
                db.session.add(pedido_producto)

            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al crear el pedido: {str(e)}"}, 500

        return nuevo_pedido.to_json(), 201


class Pedido(Resource):
    def get(self, id):
        pedido = PedidoModel.query.get_or_404(id)
        return pedido.to_json(), 200

    @jwt_required()
    def put(self, id):
        pedido = PedidoModel.query.get_or_404(id)
        data = request.get_json() or {}

        # Verificar que se envió el campo estado_pedido
        if 'estado_pedido' not in data:
            return {"mensaje": "Falta el campo 'estado_pedido'"}, 400

        # Definir estados válidos
        estados_validos = ['pendiente', 'preparando', 'listo', 'entregado', 'cancelado']
        nuevo_estado = data['estado_pedido'].lower()

        # Verificar que el nuevo estado sea válido
        if nuevo_estado not in estados_validos:
            return {
                "mensaje": f"Estado inválido. Estados permitidos: {', '.join(estados_validos)}"
            }, 400

        # Verificar que el estado sea diferente al actual
        if pedido.estado_pedido == nuevo_estado:
            return {"mensaje": f"El pedido ya tiene el estado '{nuevo_estado}'"}, 400

        # Validación de lógica de negocio: no permitir cambios desde 'entregado' o 'cancelado'
        if pedido.estado_pedido in ['entregado', 'cancelado']:
            return {
                "mensaje": f"No se puede modificar un pedido que está '{pedido.estado_pedido}'"
            }, 400

        try:
            # Actualizar el estado del pedido
            pedido.estado_pedido = nuevo_estado
            db.session.commit()
            return {
                "mensaje": f"Estado del pedido actualizado a '{nuevo_estado}' exitosamente",
                "pedido": pedido.to_json()
            }, 200
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al actualizar el pedido: {str(e)}"}, 500

    @role_required(roles=['ADMIN', 'TRABAJADOR'])
    def delete(self, id):
        pedido = PedidoModel.query.get_or_404(id)
        try:
            db.session.delete(pedido)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al eliminar el pedido: {str(e)}"}, 500
        return {"mensaje": "Pedido eliminado con éxito"}, 200


class PedidosUsuario(Resource):
    def get(self, id_usuario):
        # PAGINADO
        page = 1
        per_page = 10

        # Tomo la paginación del request si está especificada
        if request.args.get('page'):
            page = int(request.args.get('page'))
        if request.args.get('per_page'):
            per_page = int(request.args.get('per_page'))

        # Verificar que el usuario existe
        usuario = UsuarioModel.query.get_or_404(id_usuario)

        # Obtener pedidos del usuario
        pedidos = db.session.query(PedidoModel).filter(PedidoModel.id_cliente == id_usuario)

        # Filtros opcionales
        # Filtrar por fecha del pedido
        if request.args.get('fecha'):
            pedidos = pedidos.filter(PedidoModel.fecha_pedido.like("%"+request.args.get('fecha')+"%"))
        
        # Filtrar por estado del pedido
        if request.args.get('estado'):
            pedidos = pedidos.filter(PedidoModel.estado_pedido == request.args.get('estado'))
        
        # Filtrar por el método de pago
        if request.args.get('metodo_pago'):
            pedidos = pedidos.filter(PedidoModel.metodo_pago == request.args.get('metodo_pago'))

        # Ordenar por fecha más reciente primero
        pedidos = pedidos.order_by(PedidoModel.fecha_pedido.desc())

        # Paginar
        pedidos = pedidos.paginate(page=page, per_page=per_page, error_out=True)

        return jsonify({
            'pedidos': [pedido.to_json() for pedido in pedidos],
            'total': pedidos.total,
            'pages': pedidos.pages,
            'page': page,
            'usuario': usuario.nombre
        })