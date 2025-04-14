from flask_restful import Resource
from flask import request
from main.models import ValoracionModel
from .. import db

VALORACIONES = {
    1: {"valoracion": "¡Muy buen producto!", "id_usuario": 2, "id_producto": 1}
}

class Valoracion(Resource):
    def get(self, id):
        valoracion = ValoracionModel.query.get_or_404(id)

        return valoracion.to_json(), 200
        # if int(id) in VALORACIONES:
        #     return VALORACIONES[int(id)], 200
        # else:
        #     return "Valoración no encontrada", 404
        
    def post(self):
        try:
            valoracion = request.get_json()
            if not all(key in valoracion for key in ('valoracion', 'id_usuario', 'id_producto')):
                return {'mensaje': 'Faltan datos requeridos'}, 400
            nuevo_valoracion = ValoracionModel(**valoracion)
            db.session.add(nuevo_valoracion)
            db.session.commit()
            return nuevo_valoracion.to_json(), 201
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500