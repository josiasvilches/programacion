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
