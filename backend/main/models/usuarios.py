from .. import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(80), nullable=False)
    rol = db.Column(db.String(80), nullable=False, default='USER')
    estado = db.Column(db.String(80), nullable=False, default='verificacion')

    def to_json(self):
        usuario_json = {
            'usuario_id': int(self.usuario_id),
            'nombre': str(self.nombre),
            'rol': str(self.rol),
            'estado': str(self.estado)
        }
        return usuario_json