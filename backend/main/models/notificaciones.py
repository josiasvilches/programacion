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
    fecha_hora = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    tipo = db.Column(db.String(50), nullable=False)

    def to_json(self):
        return {
            'notificacion_id': int(self.notificacion_id),
            'notificacion': str(self.notificacion),
            'id_usuario': int(self.id_usuario),
            'fecha_hora': self.fecha_hora.isoformat() if self.fecha_hora else None,
            'tipo': str(self.tipo)
        }
