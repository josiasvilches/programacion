from flask_restful import Resource
from flask import request
from .. import db
from main.models import NotificacionModel
from datetime import datetime  # 👈 Necesario para parsear fecha

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
            if not all(key in data for key in ('notificacion', 'id_usuario', 'fecha_hora', 'tipo')):
                return {"mensaje": "Faltan datos requeridos ('notificacion', 'id_usuario', 'fecha_hora', 'tipo')"}, 400

            # Convertir fecha_hora de str a datetime
            try:
                fecha_hora = datetime.fromisoformat(data['fecha_hora'])
            except ValueError:
                return {"mensaje": "Formato de fecha incorrecto. Debe ser 'YYYY-MM-DD' o 'YYYY-MM-DDTHH:MM:SS'"}, 400

            nueva_notificacion = NotificacionModel(
                notificacion=data['notificacion'],
                id_usuario=data['id_usuario'],
                fecha_hora=fecha_hora,  # 👈 Ahora es datetime.datetime
                tipo=data['tipo']
            )

            db.session.add(nueva_notificacion)
            db.session.commit()

            return nueva_notificacion.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("❌ ERROR:", str(e))
            return {'error': str(e)}, 500
