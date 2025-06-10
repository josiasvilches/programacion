import os
from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from sqlalchemy.sql import text  # Importar text para consultas SQL literales
from flask_mail import Mail

# Inicializamos restful y base de datos
api = Api()
db = SQLAlchemy()
jwt = JWTManager()
mailsender = Mail()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    # Definir ruta base UN NIVEL ARRIBA (subir de main/ a backend/)
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

    # Definir carpeta y archivo de base de datos
    db_folder = os.path.join(base_dir, 'DB')
    db_name = os.getenv('DATABASE_NAME', 'grupof.db')
    db_full_path = os.path.join(db_folder, db_name)

    # Crear carpeta DB si no existe
    if not os.path.exists(db_folder):
        os.makedirs(db_folder)
        print(f"Carpeta {db_folder} creada.")

    # Crear archivo de base de datos si no existe
    if not os.path.exists(db_full_path):
        open(db_full_path, 'a').close()
        print(f"Archivo de base de datos creado en {db_full_path}")

    # Configurar SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_full_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate = Migrate(app, db)  # Mover la inicialización de Migrate aquí

    # Crear las tablas
    with app.app_context():
        try:
            from main.models import ValoracionModel, ProductoModel, UsuarioModel, PedidoModel, PedidoProductoModel

            db.session.execute(text('SELECT 1'))  # Usar text() para la consulta SQL
            print("Conexión a la base de datos exitosa.")

            db.create_all()
            print("Tablas creadas/verificadas exitosamente.")

        except Exception as e:
            print("Error al conectar o crear tablas:")
            print(e)

    import main.resources as resources

    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.ProductoResource, '/producto/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')
    api.add_resource(resources.ValoracionResource, '/valoraciones/<id>', '/valoraciones')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.CategoriasResource, '/categorias')
    api.add_resource(resources.CategoriaResource, '/categoria/<id>')

    api.init_app(app)

    # Configuración de JWT
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.getenv('JWT_ACCESS_TOKEN_EXPIRES'))
    app.config['JWT_REFRESH_TOKEN_EXPIRES'] = int(os.getenv('JWT_REFRESH_TOKEN_EXPIRES'))
    jwt.init_app(app)

    # Configuración de blueprint
    from main.auth import routes
    app.register_blueprint(routes.auth)

    # configuración de correo
    app.config['MAIL_HOSTNAME'] = os.getenv('MAIL_HOSTNAME')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT'))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS')
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('FLASKY_MAIL_SENDER')

    mailsender.init_app(app)

    return app
