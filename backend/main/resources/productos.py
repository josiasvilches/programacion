from flask_restful import Resource
from flask import request
from .. import db
from main.models import ProductoModel as ProductoModel 

class Productos(Resource):
    def get(self):
        try:
            productos = db.session.query(ProductoModel).all()  
            return [producto.to_json() for producto in productos], 200
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        """
        Se espera recibir un JSON con la siguiente estructura:
          {
            "nombre": "Nombre del producto",
            "precio": 100.50,
            "stock": 30,
            "id_categoria": 1,
            "descripcion": "Descripción del producto",
            "imagen_url": "https://url.com/imagen.jpg"
          }
        """
        data = request.get_json() or {}
        print(data)
        if not all(key in data for key in ('nombre', 'precio', 'stock')):
            return {"mensaje": "Faltan datos requeridos ('nombre', 'precio', 'stock', 'id_categoria')"}, 400

        try:
            nuevo_producto = ProductoModel(
                nombre=data['nombre'],
                precio=data['precio'],
                stock=data['stock'],
                id_categoria=data.get('id_categoria'),
                descripcion=data.get('descripcion'),   
                imagen_url=data.get('imagen_url')       
            )
            db.session.add(nuevo_producto)
            db.session.commit()
            return nuevo_producto.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al crear el producto: {str(e)}"}, 500


class Producto(Resource):
    def get(self, id):
        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404

            return producto.to_json(), 200

        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    def put(self, id):

        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404
            data = request.get_json() or {}

            if 'nombre' in data:
                producto.nombre = data['nombre']
            if 'precio' in data:
                producto.precio = data['precio']
            if 'stock' in data:
                producto.stock = data['stock']
            if 'id_categoria' in data:
                producto.id_categoria = data['id_categoria']
            if 'descripcion' in data:
                producto.descripcion = data['descripcion']
            if 'imagen_url' in data:
                producto.imagen_url = data['imagen_url']
            db.session.commit()
            return producto.to_json(), 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al actualizar el producto: {str(e)}"}, 500

    def delete(self, id):
        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404
            db.session.delete(producto)
            db.session.commit()
            return {"mensaje": "Producto eliminado con éxito"}, 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al eliminar el producto: {str(e)}"}, 500
