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
    disponible = db.Column(db.Boolean, default=True, nullable=False)  

    valoraciones = db.relationship('Valoracion', backref='producto', lazy=True)
    pedidos = db.relationship('PedidoProducto', backref='producto', lazy=True, cascade="all, delete-orphan")

    # administradores o trabajadores de rotisería
    def to_json_complete(self):
        prod_json = {
            'producto_id': self.producto_id,
            'nombre': self.nombre,
            'precio': float(self.precio),
            'stock': self.stock,
            'id_categoria': self.id_categoria,
            'descripcion': self.descripcion,
            'imagen_url': self.imagen_url,
            'disponible': self.disponible  
        }
        return prod_json
    
    # clientes
    def to_json(self):
        prod_json = {
            'producto_id': self.producto_id,
            'nombre': self.nombre,
            'precio': float(self.precio),
            'id_categoria': self.id_categoria,
            'descripcion': self.descripcion,
            'imagen_url': self.imagen_url,
            'disponible': self.disponible  
        }
        return prod_json

    # invitados que todavía NO son clientes
    def to_json_short(self):
        prod_json = {
            'producto_id': self.producto_id,
            'nombre': self.nombre,
            'precio': float(self.precio),
            'imagen_url': self.imagen_url
        }
        return prod_json

