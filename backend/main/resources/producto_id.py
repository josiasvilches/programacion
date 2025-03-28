from flask_restful import Resource
from flask import request

PRODUCTOS = {
    1: {'nombre': 'Producto1', 'precio': 100, 'stock': 50},
    2: {'nombre': 'Producto2', 'precio': 200, 'stock': 30}
}

# Definir el recurso Producto
class Producto(Resource):
    def get(self, id):
        if int(id) in PRODUCTOS:
            return PRODUCTOS[int(id)]
        return 'El producto no existe', 404

    def put(self, id):
        if int(id) in PRODUCTOS:
            producto = PRODUCTOS[int(id)]
            data = request.get_json()
            producto.update(data)
            return 'Producto editado con éxito', 200
        return 'El producto que intentas editar no existe', 404

    def delete(self, id):
        if int(id) in PRODUCTOS:
            del PRODUCTOS[int(id)]
            return 'Producto eliminado con éxito', 204
        return 'El producto que intentas eliminar no existe', 404