from flask_restful import Resource
from flask import request

USUARIOS = {
    1: {'nombre': 'Admin', 'rol': 'ADMIN'},
    2: {'nombre': 'User1', 'rol': 'USER'}
}

class Login(Resource):
    def post(self):
        datos = request.get_json()
        nombre = datos.get('nombre')

        # Buscar si existe un usuario con ese nombre
        for usuario in USUARIOS.values():
            if usuario['nombre'] == nombre:
                return {
                    'mensaje': f'Bienvenido {nombre}',
                    'rol': usuario['rol']
                }, 200

        return {'mensaje': 'Usuario no encontrado'}, 404
    
class Logout(Resource):
    def post(self):
        datos = request.get_json()
        nombre = datos.get('nombre')

        if not nombre:
            return {'mensaje': 'Nombre de usuario requerido'}, 400

        # Verificar si el usuario existe
        for usuario in USUARIOS.values():
            if usuario['nombre'] == nombre:
                return {'mensaje': f'Sesión cerrada para {nombre}'}, 200

        return {'mensaje': 'Usuario no encontrado'}, 404