from flask_restful import Resource
from flask import request
from main.models import CategoriaModel
from .. import db

class Categorias(Resource):
    def get(self):
        try:
            # Obtener todas las categorías
            categorias = CategoriaModel.query.all()
            return [categoria.to_json() for categoria in categorias], 200
        except Exception as e:
            print("ERROR:", str(e))
            return {"mensaje": f"Error al obtener las categorías: {str(e)}"}, 500

    def post(self):
        try:
            # Obtener los datos enviados en la solicitud
            data = request.get_json() or {}

            # Validar que el campo 'nombre_categoria' esté presente
            if 'nombre_categoria' not in data:
                return {"mensaje": "El campo 'nombre_categoria' es requerido"}, 400

            # Crear una nueva categoría
            nueva_categoria = CategoriaModel(
                nombre_categoria=data['nombre_categoria']
            )
            db.session.add(nueva_categoria)
            db.session.commit()
            return nueva_categoria.to_json(), 201
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al crear la categoría: {str(e)}"}, 500


class Categoria(Resource):
    def get(self, id):
        try:
            # Buscar la categoría por ID
            categoria = CategoriaModel.query.get(id)
            if categoria is None:
                return {"mensaje": "Categoría no encontrada"}, 404

            return categoria.to_json(), 200
        except Exception as e:
            print("ERROR:", str(e))
            return {"mensaje": f"Error al obtener la categoría: {str(e)}"}, 500

    def put(self, id):
        try:
            # Buscar la categoría por ID
            categoria = CategoriaModel.query.get(id)
            if categoria is None:
                return {"mensaje": "Categoría no encontrada"}, 404

            # Obtener los datos enviados en la solicitud
            data = request.get_json() or {}

            # Actualizar el nombre de la categoría si está presente
            if 'nombre_categoria' in data:
                categoria.nombre_categoria = data['nombre_categoria']

            # Guardar los cambios en la base de datos
            db.session.commit()
            return categoria.to_json(), 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al actualizar la categoría: {str(e)}"}, 500

    def delete(self, id):
        try:
            # Buscar la categoría por ID
            categoria = CategoriaModel.query.get(id)
            if categoria is None:
                return {"mensaje": "Categoría no encontrada"}, 404

            # Eliminar la categoría
            db.session.delete(categoria)
            db.session.commit()
            return {"mensaje": "Categoría eliminada con éxito"}, 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al eliminar la categoría: {str(e)}"}, 500