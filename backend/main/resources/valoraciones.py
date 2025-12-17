from flask_restful import Resource
from flask import request
from main.models import ValoracionModel, PedidoModel, PedidoProductoModel
from .. import db

class Valoracion(Resource):
    def get(self, id):
        try:
            valoracion = ValoracionModel.query.get(id)
            if valoracion is None:
                return {"mensaje": "Valoración no encontrada"}, 404

            return valoracion.to_json(), 200

        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        try:
            valoracion = request.get_json() or {}

            if not all(key in valoracion for key in ('valoracion', 'id_usuario', 'id_producto')):
                return {'mensaje': "Faltan datos requeridos ('valoracion', 'id_usuario', 'id_producto')"}, 400

            # Verificar si el usuario ya valoró este producto
            valoracion_existente = ValoracionModel.query.filter_by(
                id_usuario=valoracion['id_usuario'],
                id_producto=valoracion['id_producto']
            ).first()
            
            if valoracion_existente:
                return {'mensaje': 'Ya has valorado este producto'}, 400

            # Verificar si el usuario compró el producto
            pedido_con_producto = db.session.query(PedidoModel).join(
                PedidoProductoModel, PedidoModel.pedido_id == PedidoProductoModel.id_pedido
            ).filter(
                PedidoModel.id_cliente == valoracion['id_usuario'],
                PedidoProductoModel.id_producto == valoracion['id_producto'],
                PedidoModel.estado_pedido.in_(['entregado'])
            ).first()

            if not pedido_con_producto:
                return {'mensaje': 'Solo puedes valorar productos que hayas comprado'}, 403

            nuevo_valoracion = ValoracionModel(**valoracion)
            db.session.add(nuevo_valoracion)
            db.session.commit()

            return nuevo_valoracion.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500


class ValoracionesRecientes(Resource):
    def get(self):
        try:
            from main.models import UsuarioModel, ProductoModel
            
            # Obtener parámetro limit (por defecto 3)
            limit = request.args.get('limit', 3, type=int)
            
            # Obtener valoraciones recientes con información de usuario y producto
            valoraciones = db.session.query(
                ValoracionModel,
                UsuarioModel.nombre,
                ProductoModel.nombre.label('producto_nombre')
            ).join(
                UsuarioModel,
                ValoracionModel.id_usuario == UsuarioModel.usuario_id
            ).join(
                ProductoModel,
                ValoracionModel.id_producto == ProductoModel.producto_id
            ).order_by(
                ValoracionModel.valoracion_id.desc()
            ).limit(limit).all()
            
            # Formatear respuesta
            valoraciones_json = []
            for valoracion, nombre_usuario, producto_nombre in valoraciones:
                val_dict = valoracion.to_json()
                val_dict['nombre_usuario'] = nombre_usuario
                val_dict['producto_nombre'] = producto_nombre
                valoraciones_json.append(val_dict)
            
            return {
                'valoraciones': valoraciones_json,
                'total': len(valoraciones_json)
            }, 200
            
        except Exception as e:
            import traceback
            print("ERROR:", str(e))
            print("TRACEBACK:", traceback.format_exc())
            return {'error': str(e)}, 500


class VerificarCompraProducto(Resource):
    def get(self, id_producto, id_usuario):
        try:
            # Verificar si el usuario compró el producto y el pedido está entregado
            pedido_con_producto = db.session.query(PedidoModel).join(
                PedidoProductoModel, PedidoModel.pedido_id == PedidoProductoModel.id_pedido
            ).filter(
                PedidoModel.id_cliente == id_usuario,
                PedidoProductoModel.id_producto == id_producto,
                PedidoModel.estado_pedido.in_(['entregado'])
            ).first()

            if not pedido_con_producto:
                return {
                    'puede_valorar': False,
                    'mensaje': 'Solo puedes valorar productos que hayas comprado'
                }, 200

            # Verificar si ya valoró el producto
            valoracion_existente = ValoracionModel.query.filter_by(
                id_usuario=id_usuario,
                id_producto=id_producto
            ).first()

            if valoracion_existente:
                return {
                    'puede_valorar': False,
                    'mensaje': 'Ya has valorado este producto'
                }, 200

            return {
                'puede_valorar': True,
                'mensaje': 'Puedes valorar este producto'
            }, 200

        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500
