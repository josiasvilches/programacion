from .. import db

"""
NOTIFICACIONES = {
    1: {'notificacion': 'Su producto está en camino', 'usuario_fk': 2}
}

"""

class Notificacion(db.Model):
    __tablename__ = "notificaciones"
    id = db.Column(db.Integer, primary_key=True)
    notificacion = db.Column(db.String(255), nullable=False)
    usuario_fk = db.Column(db.Integer, nullable=False)

    def to_json(self):
        notificacion_json = {
            'id': int(self.id),
            'notificacion': str(self.notificacion),
            'usuario_fk': int(self.usuario_fk)
        }