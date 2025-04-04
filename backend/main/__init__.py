from flask import Flask
from dotenv import load_dotenv

from flask_restful import Api

import os

from flask_sqlalchemy import SQLAlchemy

#Inicializamos restful
api = Api()

#Inicializamos la base de datos
db = SQLAlchemy()

def create_app():
    #Inicializar flask
    app = Flask(__name__)
    #cargamos variables de entorno
    load_dotenv()

    if not os.path.exists(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')):
        os.mknod(os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME'))

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.getenv('DATABASE_PATH')+os.getenv('DATABASE_NAME')
    db.init_app(app)

    import main.resources as resources
    #cargar los recursos
    api.add_resource(resources.LoginResource, '/login')
    api.add_resource(resources.LogoutResource, '/logout')
    api.add_resource(resources.NotificacionesResource, '/notificaciones')
    api.add_resource(resources.PedidoResource, '/pedido/<id>')
    api.add_resource(resources.PedidosResource, '/pedidos')
    api.add_resource(resources.ProductoResource, '/producto/<id>')
    api.add_resource(resources.ProductosResource, '/productos')
    api.add_resource(resources.UsuarioResource, '/usuario/<id>')
    api.add_resource(resources.UsuariosResource, '/usuarios')
    api.add_resource(resources.ValoracionResource, '/valoraciones/<id>', '/valoraciones')
    
    api.init_app(app)
    return app
    