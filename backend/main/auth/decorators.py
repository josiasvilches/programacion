from .. import jwt
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps

# decorador para restringir acceso a usuarios con un rol específico
def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get('rol') in roles:
                return fn(*args, **kwargs)
            else:
                return ({'mensaje': 'Acceso denegado: rol no autorizado'}), 403
        return wrapper
    return decorator

# define el atributo que utilizará para identificar al usuario
@jwt.user_identity_loader
def user_identity_lookup(usuario):
    # Devuelve un diccionario con más información del usuario
    return str(usuario.usuario_id)

# define qué atributos se guardarán en el token JWT
@jwt.additional_claims_loader
def add_claims_to_access_token(usuario):
    claims = {
        'rol': usuario.rol,
        'nombre': str(usuario.nombre),
        'email': str(usuario.email)
    }
    return claims
