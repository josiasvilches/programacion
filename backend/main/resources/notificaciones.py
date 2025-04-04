from flask_restful import Resource
from flask import request

NOTIFICACIONES = {
    1: {'notificacion': 'Su producto está en camino', 'usuario_fk': 2}
}

class Notificacion(Resource):
    def post(self):
        notificacion = request.get_json()
        id = max(NOTIFICACIONES.keys())+1
        NOTIFICACIONES[id] = notificacion
        return NOTIFICACIONES[id], 201