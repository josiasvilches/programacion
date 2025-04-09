from .. import db

"""
PRODUCTOS = {
    1: {'nombre': 'Producto1', 'precio': 100, 'stock': 50},
    2: {'nombre': 'Producto2', 'precio': 200, 'stock': 30}
}
"""


class Producto(db.Model):
    __tablename__ = "productos"
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    # Convertir a JSON
    def to_json(self):
        producto_json = {
            'id': int(self.id),
            'nombre': str(self.nombre),
            'precio': int(self.precio),
            'stock': int(self.stock)
        }
        return producto_json