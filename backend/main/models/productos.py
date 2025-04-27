from .. import db

    
class Producto(db.Model):
    __tablename__ = 'productos'
    producto_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    precio = db.Column(db.Numeric(10, 2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    id_categoria = db.Column(db.Integer, db.ForeignKey('categorias.categoria_id'), nullable=True)
    descripcion = db.Column(db.Text, nullable=True)
    imagen_url = db.Column(db.String(255), nullable=True)

    valoraciones = db.relationship('Valoracion', backref='producto', lazy=True)
    pedidos = db.relationship('PedidoProducto', backref='producto', lazy=True)

    def to_json(self):
        return {
            'producto_id': self.producto_id,
            'nombre': self.nombre,
            'precio': float(self.precio),
            'stock': self.stock,
            'id_categoria': self.id_categoria,
            'descripcion': self.descripcion,
            'imagen_url': self.imagen_url
        }