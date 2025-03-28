from flask_restful import Resource
from flask import request

class Logout(Resource):
    def post(self):
        datos = request.get_json()
        nombre = datos.get('nombre')

        if not nombre:
            return {'mensaje': 'Nombre de usuario requerido'}, 400

        return {'mensaje': f'Sesión cerrada para {nombre}'}, 200
