from .. import jwt
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from datetime import datetime, timezone
import time

# decorador para restringir acceso a usuarios con un rol específico
def role_required(roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            exp_ts = claims.get("exp")
            exp_dt = datetime.fromtimestamp(exp_ts, tz=timezone.utc)
            now_dt = datetime.now(tz=timezone.utc)
            print({
                "exp_claim_UTC": exp_dt.isoformat(),
                "now_server_UTC": now_dt.isoformat()
            })
            if claims.get('rol') in roles:
                return fn(*args, **kwargs)
            else:
                return ({'mensaje': 'Acceso denegado: rol no autorizado'}), 403
        return wrapper
    return decorator

# define el atributo que utilizará para identificar al usuario
@jwt.user_identity_loader
def user_identity_lookup(usuario):
    print('hola')
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

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    # Timestamp de expiración del token (campo 'exp' en JWT)
    exp_ts = jwt_payload.get('exp')

    # Timestamp actual del servidor
    now_ts = time.time()

    # Convertir ambos a datetime UTC para mostrar y comparar
    exp_dt = datetime.fromtimestamp(exp_ts, tz=timezone.utc)
    now_dt = datetime.fromtimestamp(now_ts, tz=timezone.utc)

    return jsonify({
        "msg": "Token ha expirado",
        "exp_claim_UTC": exp_dt.isoformat(),
        "now_server_UTC": now_dt.isoformat()
    }), 401