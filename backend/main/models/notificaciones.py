from .. import db
from datetime import datetime

"""
NOTIFICACIONES = {
    1: {'notificacion': 'Su producto está en camino', 'usuario_fk': 2}
}

"""

class Notificacion(db.Model):
    __tablename__ = 'notificaciones'
    notificacion_id = db.Column(db.Integer, primary_key=True)
    notificacion = db.Column(db.Text, nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    fecha_hora = db.Column(db.DateTime, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)

    def to_json(self):
        return {
            'notificacion_id': self.notificacion_id,
            'notificacion': self.notificacion,
            'id_usuario': self.id_usuario,
            'fecha_hora': self.fecha_hora.isoformat(),
            'tipo': self.tipo
        }
