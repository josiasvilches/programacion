from .. import db
from .pedidos_productos import PedidoProducto  # ⬅️ esto al final de producto.py

"""
PRODUCTOS = {
    1: {'nombre': 'Producto1', 'precio': 100, 'stock': 50},
    2: {'nombre': 'Producto2', 'precio': 200, 'stock': 30}
}
"""

    
class Producto(db.Model):
    __tablename__ = 'productos'
    producto_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Numeric(10,2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    descripcion = db.Column(db.Text, nullable=True)
    imagen_url = db.Column(db.String(255), nullable=True)

    # Relación con Valoracion
    valoraciones = db.relationship('Valoracion', backref='producto', lazy=True)
    # Relación con PedidoProducto
    pedidos_productos = db.relationship('PedidoProducto', backref='producto', lazy=True)

    def to_json(self):
        return {
            'producto_id': int(self.producto_id),
            'nombre': str(self.nombre),
            'precio': str(self.precio),
            'descripcion': str(self.descripcion),
            'stock': int(self.stock),
            'imagen_url': str(self.imagen_url)
        }
