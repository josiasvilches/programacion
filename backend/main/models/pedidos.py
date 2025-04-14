from .. import db
from datetime import datetime

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    pedido_id = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    estado_pedido = db.Column(db.String(50), nullable=False)
    fecha_pedido = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    metodo_pago = db.Column(db.String(50), nullable=False)
    total = db.Column(db.Numeric(10,2), nullable=False)

    # Relación con PedidoProducto
    productos_pedidos = db.relationship('PedidoProducto', backref='pedido', lazy=True)

    def to_json(self):
        return {
            'pedido_id': self.pedido_id,
            'id_cliente': self.id_cliente,
            'estado_pedido': self.estado_pedido,
            'fecha_pedido': self.fecha_pedido.isoformat() if self.fecha_pedido else None,
            'metodo_pago': self.metodo_pago,
            'total': str(self.total)
        }
