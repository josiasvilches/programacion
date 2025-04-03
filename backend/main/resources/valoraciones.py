from flask_restful import Resource
from flask import request

VALORACIONES = {
    1: {"valoracion": "¡Muy buen producto!", "id_usuario": 2, "id_producto": 1}
}

class Valoracion(Resource):
    def get(self, id):
        if int(id) in VALORACIONES:
            return VALORACIONES[int(id)], 200
        else:
            return "Valoración no encontrada", 404
        
    def post(self):
        valoracion = request.get_json()
        id = int(max(VALORACIONES.keys()))+1
        VALORACIONES[id] = valoracion
        return "Valoración añadida con éxito", 201