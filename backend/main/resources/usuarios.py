from flask_restful import Resource
from flask import request
from main.models import UsuarioModel
from .. import db

USUARIOS = {
    1: {'nombre': 'Admin', 'rol': 'ADMIN', 'estado': 'activo'},
    2: {'nombre': 'User1', 'rol': 'USER', 'estado': 'activo'},
    3: {'nombre': 'User2', 'rol': 'USER', 'estado': 'verificacion'},
    4: {'nombre': 'User3', 'rol': 'USER', 'estado': 'suspendido'},
}

# Definir el recurso Usuarios
class Usuarios(Resource):
    def get(self):
        usuarios = db.session.query(UsuarioModel).all()
        usuarios_json = [usuario.to_json() for usuario in usuarios]
        return usuarios_json, 200
        # return USUARIOS
    
    def post(self):
        usuario = request.get_json()
        if not all(key in usuario for key in ('nombre', 'rol', 'estado')):
            return {'mensaje': 'Faltan datos requeridos'}, 400

        nuevo_usuario = UsuarioModel(**usuario)
        db.session.add(nuevo_usuario)
        db.session.commit()
        return nuevo_usuario.to_json(), 201
        # id = int(max(USUARIOS.keys())) + 1
        # USUARIOS[id] = usuario
        # return USUARIOS[id], 201
    
# Definir el recurso Usuario
class Usuario(Resource):
    def get(self, id):
        usuario = db.session.query(UsuarioModel).get__or_404(id)
        return usuario.to_json(), 200
        # if int(id) in USUARIOS:
        #     return USUARIOS[int(id)]
        # return 'El usuario no existe', 404

    def put(self, id):
        usuario = db.session.query(UsuarioModel).get__or_404(id)
        data = request.get_json()

        if 'nombre' in data:
            usuario.nombre = data['nombre']
        if 'rol' in data:
            usuario.rol = data['rol']
        if 'estado' in data:
            usuario.estado = data['estado']

        db.session.commit()
        return usuario.to_json(), 200
        # if int(id) in USUARIOS:
        #     usuario = USUARIOS[int(id)]
        #     data = request.get_json()
        #     usuario.update(data)
        #     return 'Usuario editado con éxito', 201
        # return 'El usuario que intentas editar no existe', 404

    def delete(self, id):
        usuario = db.session.query(UsuarioModel).get__or_404(id)
        usuario.estado = 'suspendido'
        db.session.commit()
        return {'mensaje': 'Usuario suspendido con éxito'}, 200
        # if int(id) in USUARIOS:
        #     usuario = USUARIOS[int(id)]
        #     usuario['estado'] = 'suspendido'
        #     return 'Usuario suspendido con éxito', 200
        # return 'El usuario que intentas suspender no existe', 404