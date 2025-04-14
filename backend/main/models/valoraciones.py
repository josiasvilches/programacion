from .. import db

class Valoracion(db.Model):
    __tablename__ = 'valoraciones'
    valoracion_id = db.Column(db.Integer, primary_key=True)
    valoracion = db.Column(db.String(255), nullable=False)  
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)

    def to_json(self):
        valoracion_json = {
            'valoracion_id': int(self.valoracion_id),
            'valoracion': str(self.valoracion),
            'id_usuario': int(self.id_usuario),
            'id_producto': int(self.id_producto)
        }
        return valoracion_json
