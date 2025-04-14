from flask_restful import Resource
from flask import request
from .. import db
from main.models import PedidoModel

class Pedidos(Resource):
    def get(self):
    
        pedidos = PedidoModel.query.all()
        return [pedido.to_json() for pedido in pedidos], 200

    def post(self):
        """
        Se espera recibir un JSON con la siguiente estructura:
          {
            "cliente": "Nombre del cliente",
            "producto": "Nombre del producto",
            "cantidad": <int>
          }
        """
        data = request.get_json() or {}

        # Validar que se reciban todos los campos requeridos
        if not all(key in data for key in ['cliente', 'producto', 'cantidad']):
            return {"mensaje": "Faltan datos requeridos: 'cliente', 'producto' y 'cantidad'"}, 400

        try:
            nuevo_pedido = PedidoModel(
                cliente=data['cliente'],
                producto=data['producto'],
                cantidad=data['cantidad']
            )
            db.session.add(nuevo_pedido)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al crear el pedido: {str(e)}"}, 500

        return nuevo_pedido.to_json(), 201


class Pedido(Resource):
    def get(self, id):
       
        pedido = PedidoModel.query.get_or_404(id)
        return pedido.to_json(), 200

    def put(self, id):
       
        pedido = PedidoModel.query.get_or_404(id)
        data = request.get_json() or {}

        # Actualizar solamente los campos enviados en el JSON
        if 'cliente' in data:
            pedido.cliente = data['cliente']
        if 'producto' in data:
            pedido.producto = data['producto']
        if 'cantidad' in data:
            pedido.cantidad = data['cantidad']

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al actualizar el pedido: {str(e)}"}, 500

        return pedido.to_json(), 200

    def delete(self, id):
    
        pedido = PedidoModel.query.get_or_404(id)
        try:
            db.session.delete(pedido)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al eliminar el pedido: {str(e)}"}, 500
        return {"mensaje": "Pedido eliminado correctamente"}, 204
