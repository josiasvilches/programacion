from flask_restful import Resource
from flask import request
from .. import db
from main.models import NotificacionModel  # Se asume que el modelo ya está definido

class Notificacion(Resource):

    def get(self):
        try:
            notificaciones = db.session.query(NotificacionModel).all()
            return [notificacion.to_json() for notificacion in notificaciones], 200
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500        

    def post(self):
        try:
            data = request.get_json() or {}
            # Validación de campos requeridos
            if not all(key in data for key in ['notificacion', 'id_usuario', 'fecha_hora', 'tipo']):
                return {"mensaje": "Faltan datos requeridos: 'notificacion' y 'usuario_fk'."}, 400

            nueva_notificacion = NotificacionModel(
                notificacion=data['notificacion'],
                id_usuario=data['id_usuario'],
                fecha_hora=data['fecha_hora'],
                tipo=data['tipo'],

            )
            db.session.add(nueva_notificacion)
            db.session.commit()
            db.session.rollback()

            return nueva_notificacion.to_json(), 201
        except Exception as e:
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500

