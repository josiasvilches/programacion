from flask_restful import Resource
from flask import request

USUARIOS = {
    1: {'nombre': 'Admin', 'rol': 'ADMIN', 'estado': 'activo'},
    2: {'nombre': 'User1', 'rol': 'USER', 'estado': 'activo'}
}

# Definir el recurso Usuarios
class Usuarios(Resource):
    def get(self):
        return USUARIOS
    
    def post(self):
        usuario = request.get_json()
        id = int(max(USUARIOS.keys())) + 1
        USUARIOS[id] = usuario
        return USUARIOS[id], 201