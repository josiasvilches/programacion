from .. import db

class Categoria(db.Model):
    __tablename__ = 'categorias'
    categoria_id = db.Column(db.Integer, primary_key=True)
    nombre_categoria = db.Column(db.String(100), nullable=False)

    def to_json(self):
        return {
            'categoria_id': int(self.categoria_id),
            'nombre_categoria': str(self.nombre_categoria)
        }
