from .. import db
from datetime import datetime


"""
PEDIDOS = {
    1: {'cliente': 'Juan', 'producto': 'Producto1', 'cantidad': 2},
    2: {'cliente': 'Ana', 'producto': 'Producto2', 'cantidad': 1}
}
"""


class Pedido(db.Model):
    __tablename__ = 'pedidos'
    pedido_id = db.Column(db.Integer, primary_key=True)
    fecha_pedido = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    metodo_pago = db.Column(db.String(50), nullable=False)
    total = db.Column(db.Numeric(10,2), nullable=False)

    # Relación con PedidoProducto (para acceder mediante pedido.productos_pedidos)
    productos_pedidos = db.relationship('PedidoProducto', backref='pedido', lazy=True)

    def to_json(self):
        return {
            'pedido_id': int(self.pedido_id),
            'fecha_pedido': self.fecha_pedido.isoformat() if self.fecha_pedido else None,
            'metodo_pago': str(self.metodo_pago),
            'total': str(self.total)
        }
