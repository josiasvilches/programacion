from .. import db

class Valoracion(db.Model):
    __tablename__ = 'valoraciones'
    valoracion_id = db.Column(db.Integer, primary_key=True)
    valoracion = db.Column(db.Numeric(3, 2), nullable=False)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    comentario = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            'valoracion_id': self.valoracion_id,
            'valoracion': float(self.valoracion),
            'id_usuario': self.id_usuario,
            'id_producto': self.id_producto,
            'comentario': self.comentario
        }
