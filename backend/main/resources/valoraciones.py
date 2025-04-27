from flask_restful import Resource
from flask import request
from main.models import ValoracionModel
from .. import db

class Valoracion(Resource):
    def get(self, id):
        try:
            valoracion = ValoracionModel.query.get(id)
            if valoracion is None:
                return {"mensaje": "Valoración no encontrada"}, 404

            return valoracion.to_json(), 200

        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        try:
            valoracion = request.get_json() or {}

            if not all(key in valoracion for key in ('valoracion', 'id_usuario', 'id_producto')):
                return {'mensaje': "Faltan datos requeridos ('valoracion', 'id_usuario', 'id_producto')"}, 400

            nuevo_valoracion = ValoracionModel(**valoracion)
            db.session.add(nuevo_valoracion)
            db.session.commit()

            return nuevo_valoracion.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500
