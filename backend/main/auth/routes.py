from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from main.models import UsuarioModel
from main.mail.functions import sendMail
from .. import db

auth = Blueprint('auth', __name__, url_prefix='/auth')

# Método de registro
@auth.route('/register', methods=['POST'])
def register():
    try:
        datos = request.get_json() or {}
        nombre = datos.get('nombre')
        email = datos.get('email')
        password = datos.get('password')
        numero = datos.get('numero')
        rol = datos.get('rol', 'cliente')  # Por defecto, el rol será 'cliente'

        if not nombre or not password:
            return {'mensaje': 'Nombre y password son requeridos'}, 400

        # Verificar si el usuario ya existe
        usuario_existente = UsuarioModel.query.filter_by(email=email).first()
        if usuario_existente:
            return {'mensaje': 'El email ya pertenece a un usuario'}, 409

        else:
            # Crear nuevo usuario
            nuevo_usuario = UsuarioModel(nombre=nombre, email=email, plain_password=password, numero=numero, rol=rol)
            db.session.add(nuevo_usuario)
            db.session.commit()
            send = sendMail([nuevo_usuario.email], "¡Bienvenid@ a Grupo F' Rotiseria!", "register", nuevo_usuario=nuevo_usuario)

    except Exception as e:
        print("ERROR:", str(e))
        return {'error': str(e)}, 500
    return {'mensaje': f'Usuario {nombre} registrado exitosamente'}, 201

# Método de login
@auth.route('/login', methods=['POST'])
def login():
    try:
        datos = request.get_json() or {}
        email = datos.get('email')
        password = datos.get('password')

        if not email or not password:
            return {'mensaje': 'Email y password son requeridos'}, 400

        # Buscar usuario por email
        usuario = UsuarioModel.query.filter_by(email=email).first()
        if not usuario or not usuario.validate_pass(password):
            return {'mensaje': 'Credenciales inválidas'}, 401

        # Crear token de acceso
        access_token = create_access_token(identity=usuario)

        data = {
            'mensaje': f'Bienvenido {usuario.nombre}',
            'access_token': access_token,
            'rol': usuario.rol
        }
        return data, 200
    except Exception as e:
        print("ERROR:", str(e))
        return {'error': str(e)}, 500

# Método de logout
@auth.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        identity = get_jwt_identity()
        usuario_id = identity.get('usuario_id')  # Usar .get() para acceder al valor
        usuario = UsuarioModel.query.get(usuario_id)
        if not usuario:
            return {'mensaje': 'Usuario no encontrado'}, 404

        return {'mensaje': f'Sesión cerrada para {usuario.nombre}'}, 200
    except Exception as e:
        print("ERROR:", str(e))
        return {'error': str(e)}, 500

# Ruta protegida de ejemplo
@auth.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        identity = get_jwt_identity()
        usuario_id = identity.get('usuario_id')  # Usar .get() para acceder al valor
        rol = identity.get('rol')  # Usar .get() para acceder al valor

        usuario = UsuarioModel.query.get(usuario_id)
        if not usuario:
            return {'mensaje': 'Usuario no encontrado'}, 404

        return {'mensaje': f'Acceso permitido para {usuario.nombre} con rol {rol}'}, 200
    except Exception as e:
        print("ERROR:", str(e))
        return {'error': str(e)}, 500
