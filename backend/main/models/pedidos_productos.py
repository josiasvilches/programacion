from .. import db

class PedidoProducto(db.Model):
    __tablename__ = 'pedidos_productos'
    pedido_producto_id = db.Column(db.Integer, primary_key=True)
    id_producto = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedidos.pedido_id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario = db.Column(db.Numeric(10, 2), nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)

    # No es necesario definir la relación aquí porque ya existe en Producto
    # La relación 'producto' ya está disponible a través del backref definido en Producto

    def to_json(self):
        producto_nombre = None
        # Usar la relación 'producto' que viene del backref en Producto
        if hasattr(self, 'producto') and self.producto:
            producto_nombre = self.producto.nombre
        
        return {
            'pedido_producto_id': self.pedido_producto_id,
            'id_producto': self.id_producto,
            'id_pedido': self.id_pedido,
            'cantidad': self.cantidad,
            'precio_unitario': float(self.precio_unitario),
            'subtotal': float(self.subtotal),
            'nombre_producto': producto_nombre
        }