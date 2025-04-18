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
    
# Definir el recurso Usuario
class Usuario(Resource):
    def get(self, id):
        if int(id) in USUARIOS:
            return USUARIOS[int(id)]
        return 'El usuario no existe', 404

    def put(self, id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            data = request.get_json()
            usuario.update(data)
            return 'Usuario editado con éxito', 201
        return 'El usuario que intentas editar no existe', 404

    def delete(self, id):
        if int(id) in USUARIOS:
            usuario = USUARIOS[int(id)]
            usuario['estado'] = 'suspendido'
            return 'Usuario suspendido con éxito', 200
        return 'El usuario que intentas suspender no existe', 404