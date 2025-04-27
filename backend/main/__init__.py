from flask import Flask
from dotenv import load_dotenv
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
import os

# Inicializamos restful y base de datos
api = Api()
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    load_dotenv()

    # 🚀 Definir ruta base UN NIVEL ARRIBA (subir de main/ a backend/)
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

    # Definir carpeta y archivo de base de datos
    db_folder = os.path.join(base_dir, 'DB')
    db_name = os.getenv('DATABASE_NAME', 'database.sqlite')
    db_full_path = os.path.join(db_folder, db_name)

    # Crear carpeta DB si no existe
    if not os.path.exists(db_folder):
        os.makedirs(db_folder)
        print(f"✅ Carpeta {db_folder} creada.")

    # Crear archivo de base de datos si no existe
    if not os.path.exists(db_full_path):
        open(db_full_path, 'a').close()
        print(f"✅ Archivo de base de datos creado en {db_full_path}")

    # Configurar SQLAlchemy
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_full_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Crear las tablas
    with app.app_context():
        try:
            from main.models import ValoracionModel, ProductoModel, UsuarioModel, PedidoModel, PedidoProductoModel

            db.session.execute(text('SELECT 1'))
            print("✅ Conexión a la base de datos exitosa.")

            db.create_all()
            print("✅ Tablas creadas/verificadas exitosamente.")

        except Exception as e:
            print("❌ Error al conectar o crear tablas:")
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


    api.init_app(app)
    return app
    # api.add_resource(resources.LoginResource, '/login')
    # api.add_resource(resources.LogoutResource, '/logout')
