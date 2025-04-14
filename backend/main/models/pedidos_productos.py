from .. import db

class PedidoProducto(db.Model):
    __tablename__ = 'pedidos_productos'

    pedido_producto_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    id_pedido = db.Column(
        db.Integer,
        db.ForeignKey('pedidos.pedido_id', ondelete="CASCADE"),
        nullable=False
    )

    id_producto = db.Column(
        db.Integer,
        db.ForeignKey('productos.producto_id'),
        nullable=False
    )

    cantidad = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    precio_unitario = db.Column(db.Numeric(10, 2), nullable=False)

    def to_json(self):
        return {
            'pedido_producto_id': self.pedido_producto_id,
            'id_pedido': self.id_pedido,
            'id_producto': self.id_producto,
            'cantidad': self.cantidad,
            'subtotal': str(self.subtotal),
            'precio_unitario': str(self.precio_unitario)
        }
