from .. import db
from datetime import datetime

class Campana(db.Model):
    __tablename__ = 'campanas'
    campana_id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(200), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    descuento = db.Column(db.String(100), nullable=True)  # Ejemplo: "50% OFF", "2x1", "$500 descuento"
    estado = db.Column(db.String(50), nullable=False, default='activa')  # activa, pausada, finalizada
    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    fecha_inicio = db.Column(db.DateTime, nullable=True)
    fecha_fin = db.Column(db.DateTime, nullable=True)

    def to_json(self):
        campana_json = {
            'campana_id': self.campana_id,
            'titulo': self.titulo,
            'mensaje': self.mensaje,
            'descuento': self.descuento,
            'estado': self.estado,
            'fecha_creacion': self.fecha_creacion.isoformat() if self.fecha_creacion else None,
            'fecha_inicio': self.fecha_inicio.isoformat() if self.fecha_inicio else None,
            'fecha_fin': self.fecha_fin.isoformat() if self.fecha_fin else None
        }
        return campana_json

    @staticmethod
    def from_json(campana_json):
        id = campana_json.get('campana_id')
        titulo = campana_json.get('titulo')
        mensaje = campana_json.get('mensaje')
        descuento = campana_json.get('descuento')
        estado = campana_json.get('estado', 'activa')
        fecha_inicio = campana_json.get('fecha_inicio')
        fecha_fin = campana_json.get('fecha_fin')
        
        return Campana(
            campana_id=id,
            titulo=titulo,
            mensaje=mensaje,
            descuento=descuento,
            estado=estado,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin
        )
