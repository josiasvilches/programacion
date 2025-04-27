from .. import db

class PedidoProducto(db.Model):
    __tablename__ = 'pedidos_productos'
    pedido_producto_id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.pedido_id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario = db.Column(db.Numeric(10, 2), nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)

    def to_json(self):
        return {
            'pedido_producto_id': self.pedido_producto_id,
            'id_producto': self.id_producto,
            'id_pedido': self.id_pedido,
            'cantidad': self.cantidad,
            'precio_unitario': float(self.precio_unitario),
            'subtotal': float(self.subtotal)
        }