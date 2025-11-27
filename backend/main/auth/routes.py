from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, get_jwt, verify_jwt_in_request
from main.models import UsuarioModel
from main.mail.functions import sendMail
from .. import db

auth = Blueprint('auth', __name__, url_prefix='/auth')

# Método de registro
@auth.route('/register', methods=['POST'])
def register():
    datos = request.get_json() or {}
    nombre = datos.get('nombre')
    email = datos.get('email')
    password = datos.get('password')
    numero = datos.get('numero')
    rol = datos.get('rol', 'USER')  # Por defecto, el rol será 'USER'

    if not nombre or not password:
        return {'mensaje': 'Nombre y password son requeridos'}, 400

    try:
        # Verificar si el usuario ya existe
        usuario_existente = UsuarioModel.query.filter_by(email=email).first()
        if usuario_existente:
            return {'mensaje': 'El email ya pertenece a un usuario'}, 409

        # Crear nuevo usuario
        nuevo_usuario = UsuarioModel(nombre=nombre, email=email, plain_password=password, numero=numero, rol=rol)
        db.session.add(nuevo_usuario)
        db.session.commit()

        # Intentar enviar correo de bienvenida, pero no fallar el registro si el envío falla
        mail_sent = False
        try:
            send = sendMail([nuevo_usuario.email], "¡Bienvenid@ a Grupo F' Rotiseria!", "register", nuevo_usuario=nuevo_usuario)
            mail_sent = True
        except Exception as mail_err:
            # Loguear el error pero no propagarlo al cliente
            print(f"Warning: fallo al enviar correo de bienvenida: {mail_err}")
            mail_sent = False

    except Exception as e:
        # Si algo falla antes del commit, revertir la transacción
        try:
            db.session.rollback()
        except Exception:
            pass
        print("ERROR:", str(e))
        return {'error': str(e)}, 500

    # Responder con los datos del usuario creado y un mensaje de éxito
    try:
        usuario_json = nuevo_usuario.to_json()
    except Exception:
        usuario_json = {
            'usuario_id': getattr(nuevo_usuario, 'usuario_id', None),
            'nombre': nombre,
            'email': email,
            'rol': rol
        }

    return {'mensaje': f'Usuario {nombre} registrado exitosamente', 'usuario': usuario_json, 'mail_sent': mail_sent}, 201

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

        # Verificar el estado del usuario
        if usuario.estado and usuario.estado.lower() == 'en espera':
            return {
                'mensaje': 'Tu cuenta está pendiente de aprobación. Un administrador debe activarla antes de que puedas iniciar sesión.',
                'estado': 'en espera'
            }, 403
        
        if usuario.estado and usuario.estado.lower() == 'inactivo':
            return {
                'mensaje': 'Tu cuenta ha sido desactivada. Contacta con el administrador.',
                'estado': 'inactivo'
            }, 403

        # Solo permitir login si el estado es "activo"
        if not usuario.estado or usuario.estado.lower() != 'activo':
            return {
                'mensaje': 'Tu cuenta no está activa. Contacta con el administrador.',
                'estado': usuario.estado
            }, 403

        # Crear token de acceso: usar un identity consistente (dict)
        identity_payload = {
            'usuario_id': usuario.usuario_id,
            'rol': usuario.rol,
            'nombre': usuario.nombre,
            'email': usuario.email
        }
        access_token = create_access_token(identity=identity_payload)
        refresh_token = create_refresh_token(identity=identity_payload)

        data = {
            'mensaje': f'Bienvenido {usuario.nombre}',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'rol': usuario.rol
        }
        return data, 200
    except Exception as e:
        print("ERROR:", str(e))
        return {'error': str(e)}, 500
    
@auth.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    # identity será un dict con 'usuario_id'
    usuario_id = None
    if isinstance(identity, dict):
        usuario_id = identity.get('usuario_id')
    else:
        usuario_id = identity
    usuario = UsuarioModel.query.get(usuario_id)
    if not usuario:
        return {"msg": "Usuario no encontrado"}, 404

    new_access  = create_access_token(identity=identity, fresh=False)
    return {'access_token': new_access}, 200

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

# Ruta protegida
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

