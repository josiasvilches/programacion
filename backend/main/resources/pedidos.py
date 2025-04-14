from flask_restful import Resource
from flask import request
from .. import db
from main.models import PedidoModel, PedidoProducto

class Pedidos(Resource):
    def get(self):
        pedidos = PedidoModel.query.all()
        return [pedido.to_json() for pedido in pedidos], 200

    def post(self):
        data = request.get_json() or {}

        if not all(key in data for key in ['id_cliente', 'estado_pedido', 'metodo_pago', 'productos']):
            return {"mensaje": "Faltan campos requeridos: 'id_cliente', 'estado_pedido', 'metodo_pago', 'productos'"}, 400

        productos = data['productos']
        if not isinstance(productos, list) or not productos:
            return {"mensaje": "El campo 'productos' debe ser una lista con al menos un producto"}, 400

        try:
            total = sum(p['subtotal'] for p in productos)

            nuevo_pedido = PedidoModel(
                id_cliente=data['id_cliente'],
                estado_pedido=data['estado_pedido'],
                metodo_pago=data['metodo_pago'],
                total=total
            )
            db.session.add(nuevo_pedido)
            db.session.flush()  # Obtener el ID del pedido antes del commit

            for p in productos:
                pedido_producto = PedidoProducto(
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

    def delete(self, id):
        pedido = PedidoModel.query.get_or_404(id)
        try:
            db.session.delete(pedido)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al eliminar el pedido: {str(e)}"}, 500
        return {"mensaje": "Pedido eliminado con éxito"}, 204