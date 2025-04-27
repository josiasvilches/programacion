from .. import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    estado = db.Column(db.String(50), nullable=False)

    notificaciones = db.relationship('Notificacion', backref='usuario', lazy=True)
    pedidos = db.relationship('Pedido', backref='cliente', lazy=True)
    valoraciones = db.relationship('Valoracion', backref='usuario', lazy=True)

    def to_json(self):
        return {
            'usuario_id': self.usuario_id,
            'nombre': self.nombre,
            'rol': self.rol,
            'estado': self.estado
        }