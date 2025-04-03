from flask_restful import Resource
from flask import request

PEDIDOS = {
    1: {'cliente': 'Juan', 'producto': 'Producto1', 'cantidad': 2},
    2: {'cliente': 'Ana', 'producto': 'Producto2', 'cantidad': 1}
}

# Definir el recurso Pedidos
class Pedidos(Resource):
    def get(self):
        return PEDIDOS

    def post(self):
        pedido = request.get_json()
        id = int(max(PEDIDOS.keys())) + 1 if PEDIDOS else 1
        PEDIDOS[id] = pedido
        return PEDIDOS[id], 201


class Pedido(Resource):
    def get(self, id):
        if int(id) in PEDIDOS:
            return PEDIDOS[int(id)]
        else:
            return "Pedido no encontrado", 404
        
    def delete(self, id):
        if int(id) in PEDIDOS:
            del PEDIDOS[int(id)]
            return "Eliminado con éxito", 204
        else:
            return "Pedido no encontrado", 404
        
    def put(self, id):
        if int(id) in PEDIDOS:
            pedido = PEDIDOS[int(id)]
            data = request.get_json()
            pedido.update(data)
            return "Modificado correctamente.", 201
        else:
            return "El ID que intenta encontrar es inexistente", 404