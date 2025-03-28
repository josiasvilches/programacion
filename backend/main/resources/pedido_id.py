from flask_restful import Resource
from flask import request

PEDIDOS = {
    1: {'cliente': 'Juan', 'producto': 'Producto1', 'cantidad': 2},
    2: {'cliente': 'Ana', 'producto': 'Producto2', 'cantidad': 1}
}

class Pedido(Resource):
    def get(self, id):
        if id in PEDIDOS:
            return PEDIDOS[id], 200
        else:
            return "Pedido no encontrado", 404
        
    def delete(self, id):
        if id in PEDIDOS:
            del PEDIDOS[id]
            return "Eliminado con éxito", 204
        else:
            return "Pedido no encontrado", 404
        
    def put(self, id):
        if id in PEDIDOS:
            pedido = PEDIDOS[id]
            data = request.get_json()
            pedido.update(data)
            return "Modificado correctamente.", 201
        else:
            return "El ID que intenta encontrar es inexistente", 404