from flask_restful import Resource
from flask import request
from main.models import UsuarioModel

class Login(Resource):
    def post(self):
        datos = request.get_json()
        nombre = datos.get('nombre')

        if not nombre:
            return {'mensaje': 'Nombre de usuario requerido'}, 400

        # Buscar usuario en la base de datos
        usuario = UsuarioModel.query.filter_by(nombre=nombre).first()
        
        if usuario:
            return {
                'mensaje': f'Bienvenido {nombre}',
                'rol': usuario.rol
            }, 200

        return {'mensaje': 'Usuario no encontrado'}, 404
    
class Logout(Resource):
    def post(self):
        datos = request.get_json()
        nombre = datos.get('nombre')

        if not nombre:
            return {'mensaje': 'Nombre de usuario requerido'}, 400

        # Verificar si el usuario existe en la base de datos
        usuario = UsuarioModel.query.filter_by(nombre=nombre).first()
        
        if usuario:
            return {'mensaje': f'Sesión cerrada para {nombre}'}, 200

        return {'mensaje': 'Usuario no encontrado'}, 404