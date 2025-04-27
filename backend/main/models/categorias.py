from .. import db

class Categoria(db.Model):
    __tablename__ = 'categorias'
    categoria_id = db.Column(db.Integer, primary_key=True)
    nombre_categoria = db.Column(db.String(100), nullable=False)

    productos = db.relationship('Producto', backref='categoria', lazy=True)

    def to_json(self):
        return {
            'categoria_id': self.categoria_id,
            'nombre_categoria': self.nombre_categoria
        }
