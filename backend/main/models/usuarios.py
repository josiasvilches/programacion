from .. import db

from werkzeug.security import generate_password_hash, check_password_hash

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    usuario_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(50), nullable=False, default='cliente')
    estado = db.Column(db.String(50), nullable=False, default='en espera')

    email = db.Column(db.String(120), unique=True, index=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    numero = db.Column(db.String(20), nullable=False)

    notificaciones = db.relationship('Notificacion', backref='usuario', lazy=True)
    pedidos = db.relationship('Pedido', back_populates='cliente', lazy=True)
    valoraciones = db.relationship('Valoracion', backref='usuario', lazy=True)

    def to_json(self):
        user_json = {
            'usuario_id': self.usuario_id,
            'nombre': str(self.nombre),
            'rol': self.rol,
            'estado': self.estado,
            'email': str(self.email)
        }
        return user_json
    
    def to_json_complete(self):
        notificaciones = [notificaciones.to_json() for notificaciones in self.notificaciones]
        pedidos = [pedido.to_json() for pedido in self.pedidos]
        valoraciones = [valoracion.to_json() for valoracion in self.valoraciones]
        user_json = {
            'usuario_id': self.usuario_id,
            'nombre': str(self.nombre),
            'rol': self.rol,
            'estado': self.estado,
            'numero': int(self.numero),
            'email': str(self.email),
            'notificaciones': notificaciones,
            'pedidos': pedidos,
            'valoraciones': valoraciones
        }
        return user_json

    def to_json_short(self):
        user_json = {
            'usuario_id': self.usuario_id,
            'nombre': str(self.nombre)
        }
        return user_json
    
    # getter de contraseña plana, no permite leerla
    @property
    def plain_password(self):
        raise AttributeError("Password is not accessible")
    
    # setter de contraseña, hace un hash de la contraseña
    @plain_password.setter
    def plain_password(self, password):
        self.password = generate_password_hash(password)

    # método compara contraseña hasheada con contraseña plana
    def validate_pass(self, password):
        return check_password_hash(self.password, password)
    
    @staticmethod
    def from_json(user_json):
        user_json = {
            "usuario_id": 1,
            "nombre": "Josías Vilches",
            "rol": "ADMIN",
            "estado": "activo",
            "email": "jl.vilches@alumno.um.edu.ar",
            "password": "123456"
        }
        usuario = Usuario.from_json(user_json)
        print(usuario.to_json())