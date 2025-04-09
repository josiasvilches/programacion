from .. import db

"""
PEDIDOS = {
    1: {'cliente': 'Juan', 'producto': 'Producto1', 'cantidad': 2},
    2: {'cliente': 'Ana', 'producto': 'Producto2', 'cantidad': 1}
}
"""

class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(255), nullable=False)
    producto = db.Column(db.String(255), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    def to_json(self):
        pedido_json = {
            'id': int(self.id),
            'cliente': str(self.cliente),
            'producto': str(self.producto),
            'cantidad': int(self.cantidad)
        }