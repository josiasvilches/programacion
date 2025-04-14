from .. import db

class PedidoProducto(db.Model):
    __tablename__ = 'pedidos_productos'
    # Según la convención, si es una tabla intermedia, se usan las claves primarias compuestas
    pedido_producto_id = db.Column(db.Integer, primary_key=True)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.pedido_id'), primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), primary_key=True)
    cantidad = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Numeric(10,2), nullable=False)

    def to_json(self):
        return {
            'pedido_producto_id': int(self.pedido_producto_id),
            'id_pedido': int(self.id_pedido),
            'id_producto': int(self.id_producto),
            'cantidad': int(self.cantidad),
            'subtotal': str(self.subtotal)
        }
