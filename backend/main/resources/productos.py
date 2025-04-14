
from flask_restful import Resource
from flask import request
from .. import db

from main.models import ProductoModel

class Productos(Resource):
    def get(self):
        try:
            productos = db.session.query(ProductoModel).all()
            return [producto.to_json() for producto in productos], 200
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        """
        Se espera recibir un JSON con la siguiente estructura:
          {
            "nombre": "Nombre del producto",
            "precio": 100.50,
            "stock": 30
          }
        """
        data = request.get_json() or {}

        # Validar que se reciban todos los datos requeridos
        if not all(key in data for key in ('nombre', 'precio', 'stock')):
            return {"mensaje": "Faltan datos requeridos ('nombre', 'precio' y 'stock')"}, 400

        try:
            nuevo_producto = ProductoModel(
                nombre=data['nombre'],
                precio=data['precio'],
                stock=data['stock']
            )
            db.session.add(nuevo_producto)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al crear el producto: {str(e)}"}, 500

        return nuevo_producto.to_json(), 201


class Producto(Resource):
    def get(self, id):
        try:
            producto = ProductoModel.query.get_or_404(id)
            return producto.to_json(), 200
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

    def put(self, id):
       
        producto = ProductoModel.query.get_or_404(id)
        data = request.get_json() or {}

        if 'nombre' in data:
            producto.nombre = data['nombre']
        if 'precio' in data:
            producto.precio = data['precio']
        if 'stock' in data:
            producto.stock = data['stock']

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al actualizar el producto: {str(e)}"}, 500

        return producto.to_json(), 200

    def delete(self, id):
       
        producto = ProductoModel.query.get_or_404(id)
        try:
            db.session.delete(producto)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"mensaje": f"Error al eliminar el producto: {str(e)}"}, 500

        return {"mensaje": "Producto eliminado con éxito"}, 204
