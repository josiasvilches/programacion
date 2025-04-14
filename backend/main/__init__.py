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

    # ⚙️ Cargar configuración de conexión (ajustar esto si usás MariaDB o SQLite)
    db_path = os.getenv('DATABASE_PATH')
    db_name = os.getenv('DATABASE_NAME')

    full_path = db_path + db_name

    # if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
    #     os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))
    # 🔗 URI para MariaDB
    app.config['SQLALCHEMY_DATABASE_URI'] = full_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # ✅ Probar conexión a la base de datos
    with app.app_context():
        try:
            db.session.execute(text('SELECT 1'))

            print("✅ Conexión a la base de datos exitosa.")
        except Exception as e:
            print("❌ Error al conectar a la base de datos:")
            print(e)

    
    import main.resources as resources

    api.add_resource(resources.ProductosResource, '/productos')
    # api.add_resource(resources.LoginResource, '/login')
    # api.add_resource(resources.LogoutResource, '/logout')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.ProductoResource, '/producto/<id>')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.ValoracionResource, '/valoraciones/<id>', '/valoraciones')

    api.init_app(app)
    return app
