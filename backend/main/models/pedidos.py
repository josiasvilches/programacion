from .. import db
from datetime import datetime

class Pedido(db.Model):
    __tablename__ = 'pedidos'
    pedido_id = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    fecha_pedido = db.Column(db.DateTime, nullable=False)
    estado_pedido = db.Column(db.String(50), nullable=False)
    metodo_pago = db.Column(db.String(50), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)

    productos = db.relationship('PedidoProducto', backref='pedido', lazy=True, cascade="all, delete-orphan")

    def to_json(self):
        return {
            'pedido_id': self.pedido_id,
            'id_cliente': self.id_cliente,
            'fecha_pedido': self.fecha_pedido.isoformat(),
            'estado_pedido': self.estado_pedido,
            'metodo_pago': self.metodo_pago,
            'total': float(self.total)
        }