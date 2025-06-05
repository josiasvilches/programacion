from flask_restful import Resource
from flask import request, jsonify
from main.models import UsuarioModel
from .. import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required

# Recurso para lista de usuarios
class Usuarios(Resource):
    def get(self):
        try:
            page = 1
            per_page = 10

            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))
            
            usuarios = db.session.query(UsuarioModel)

            # Filtrar por nombre
            
            if request.args.get('nombre'):
                usuarios = usuarios.filter(UsuarioModel.nombre == request.args.get('nombre'))
            # Filtrar por rol
            if request.args.get('rol'):
                usuarios = usuarios.filter(UsuarioModel.rol == request.args.get('rol'))
            # Filtrar por estado
            if request.args.get('estado'):
                usuarios = usuarios.filter(UsuarioModel.estado == request.args.get('estado'))

            usuarios = usuarios.paginate(page=page, per_page=per_page, error_out=True)
            usuarios_json = [usuario.to_json() for usuario in usuarios]
            return jsonify({'usuarios': usuarios_json,
                           'total': usuarios.total,
                           'pages': usuarios.pages,
                           'page': usuarios.page})
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    def post(self):
        try:
            usuario = request.get_json() or {}
            if not all(key in usuario for key in ('nombre', 'rol', 'estado')):
                return {'mensaje': 'Faltan datos requeridos ("nombre", "rol", "estado")'}, 400

            nuevo_usuario = UsuarioModel(**usuario)
            db.session.add(nuevo_usuario)
            db.session.commit()
            return nuevo_usuario.to_json(), 201
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

# Recurso para un usuario individual
class Usuario(Resource):

    @jwt_required(optional=True)
    def get(self, id):
        try:
            usuario = UsuarioModel.query.get(id)
            if usuario is None:
                return {'mensaje': 'Usuario no encontrado'}, 404
            current_identity = get_jwt_identity()
            if current_identity == usuario.id:
                return usuario.to_json_complete(), 200  # Devuelve todo si es su propio perfil
            else:
                return usuario.to_json_short(), 200  # Devuelve datos limitados si es otro
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500


    def put(self, id):
        try:
            usuario = UsuarioModel.query.get(id)
            if usuario is None:
                return {'mensaje': 'Usuario no encontrado'}, 404

            data = request.get_json() or {}

            if 'nombre' in data:
                usuario.nombre = data['nombre']
            if 'rol' in data:
                usuario.rol = data['rol']
            if 'estado' in data:
                usuario.estado = data['estado']

            db.session.commit()
            return usuario.to_json(), 200

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    @role_required(roles = ['ADMIN', 'cliente'])
    def delete(self, id):
        try:
            usuario = UsuarioModel.query.get(id)
            if usuario is None:
                return {'mensaje': 'Usuario no encontrado'}, 404

            usuario.estado = 'suspendido'
            db.session.commit()
            return {'mensaje': 'Usuario suspendido con éxito'}, 200

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500
