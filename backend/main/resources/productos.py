from flask_restful import Resource
from flask import request

PRODUCTOS = {
    1: {'nombre': 'Producto1', 'precio': 100, 'stock': 50},
    2: {'nombre': 'Producto2', 'precio': 200, 'stock': 30}
}

# Definir el recurso Productos
class Productos(Resource):
    def get(self):
        return PRODUCTOS

    def post(self):
        producto = request.get_json()
        id = int(max(PRODUCTOS.keys())) + 1 if PRODUCTOS else 1
        PRODUCTOS[id] = producto
        return PRODUCTOS[id], 201