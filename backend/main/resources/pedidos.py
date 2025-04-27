from flask_restful import Resource
from flask import request
from .. import db
from main.models import PedidoModel, PedidoProductoModel
from datetime import datetime

class Pedidos(Resource):
    def get(self):
        try:
            pedidos = PedidoModel.query.all()
            return [pedido.to_json() for pedido in pedidos], 200
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        try:
            data = request.get_json() or {}

            if not all(key in data for key in ('id_cliente', 'estado_pedido', 'metodo_pago', 'productos')):
                return {"mensaje": "Faltan campos requeridos: 'id_cliente', 'estado_pedido', 'metodo_pago', 'productos'"}, 400

            productos = data['productos']
            if not isinstance(productos, list) or not productos:
                return {"mensaje": "El campo 'productos' debe ser una lista con al menos un producto"}, 400

            total = sum(p['subtotal'] for p in productos)

            nuevo_pedido = PedidoModel(
                id_cliente=data['id_cliente'],
                fecha_pedido=datetime.now(),  # 👈 Fecha actual
                estado_pedido=data['estado_pedido'],
                metodo_pago=data['metodo_pago'],
                total=total
            )
            db.session.add(nuevo_pedido)
            db.session.flush()

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
            return nuevo_pedido.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("❌ ERROR:", str(e))
            return {"mensaje": f"Error al crear el pedido: {str(e)}"}, 500

class Pedido(Resource):
    def get(self, id):
        try:
            pedido = PedidoModel.query.get(id)
            if pedido is None:
                return {"mensaje": "Pedido no encontrado"}, 404

            return pedido.to_json(), 200

        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

    def delete(self, id):
        try:
            pedido = PedidoModel.query.get(id)
            if pedido is None:
                return {"mensaje": "Pedido no encontrado"}, 404

            # 🔥 Primero borrar los productos asociados
            db.session.query(PedidoProductoModel).filter_by(id_pedido=pedido.pedido_id).delete()

            # 🔥 Luego borrar el pedido
            db.session.delete(pedido)
            db.session.commit()

            return {"mensaje": "Pedido eliminado con éxito"}, 200

        except Exception as e:
            db.session.rollback()
            print("❌ ERROR:", str(e))
            return {"mensaje": f"Error al eliminar el pedido: {str(e)}"}, 500
