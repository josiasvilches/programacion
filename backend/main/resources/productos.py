from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required
from .. import db
from main.models import ProductoModel as ProductoModel, UsuarioModel as UsuarioModel

class Productos(Resource):
    def get(self):
        try:
            #productos = db.session.query(ProductoModel).all()
            page = 1
            per_page = 10

            productos = db.session.query(ProductoModel)

            if request.args.get('page'):
                page = int(request.args.get('page'))
            if request.args.get('per_page'):
                per_page = int(request.args.get('per_page'))

            # Filtrar por nombre
            if request.args.get('nombre'):
                productos = productos.filter(ProductoModel.nombre.like("%"+request.args.get('nombre')+"%"))
            # Filtrar por precio. NOTA: En postman hay que añadir dos params de precio: un límite menor y uno mayor.
            if request.args.getlist('precios'):
                min_precio, max_precio = request.args.getlist('precios')
                print(min_precio, max_precio)
                productos = productos.filter(ProductoModel.precio.between(min_precio, max_precio))

            productos = productos.paginate(page=page, per_page=per_page, error_out=True)

            current_identity = get_jwt_identity()
            if current_identity:
                usuario = db.session.query(UsuarioModel).get(current_identity)
                if usuario.rol == 'ADMIN':
                    productos_json = [producto.to_json_complete() for producto in productos.items]
                elif usuario.rol == 'USER':
                    productos_json = [producto.to_json() for producto in productos.items]
                else:
                    productos_json = [producto.to_json_short() for producto in productos.items]
            else:
                productos_json = [producto.to_json_short() for producto in productos.items]

            return jsonify({'productos': productos_json,
                            'total': productos.total,
                            'pages': productos.pages,
                            'page': page})
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500
    
    @role_required(roles=['ADMIN'])
    def post(self):
        """
        Se espera recibir un JSON con la siguiente estructura:
          {
            "nombre": "Nombre del producto",
            "precio": 100.50,
            "stock": 30,
            "id_categoria": 1,
            "descripcion": "Descripción del producto",
            "imagen_url": "https://url.com/imagen.jpg"
          }
        """
        data = request.get_json() or {}
        print(data)
        if not all(key in data for key in ('nombre', 'precio', 'stock')):
            return {"mensaje": "Faltan datos requeridos ('nombre', 'precio', 'stock', 'id_categoria')"}, 400

        try:
            nuevo_producto = ProductoModel(
                nombre=data['nombre'],
                precio=data['precio'],
                stock=data['stock'],
                id_categoria=data.get('id_categoria'),
                descripcion=data.get('descripcion'),   
                imagen_url=data.get('imagen_url')       
            )
            db.session.add(nuevo_producto)
            db.session.commit()
            return nuevo_producto.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al crear el producto: {str(e)}"}, 500


class Producto(Resource):
    
    @jwt_required(optional=True)
    def get(self, id):
        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404

            current_identity = get_jwt_identity()
            if current_identity:
                usuario = db.session.query(UsuarioModel).get(current_identity)
                if usuario.rol == 'ADMIN':
                    return producto.to_json_complete(), 200
                elif usuario.rol == 'cliente':
                    return producto.to_json(), 200
                else:
                    return producto.to_json_short(), 200
            else:
                return producto.to_json_short(), 200
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    @role_required(roles=['ADMIN'])
    def put(self, id):
        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404

            data = request.get_json() or {}
            if 'nombre' in data:
                producto.nombre = data['nombre']
            if 'precio' in data:
                producto.precio = data['precio']
            if 'stock' in data:
                producto.stock = data['stock']
            if 'id_categoria' in data:
                producto.id_categoria = data['id_categoria']
            if 'descripcion' in data:
                producto.descripcion = data['descripcion']
            if 'imagen_url' in data:
                producto.imagen_url = data['imagen_url']
            db.session.commit()
            return producto.to_json_complete(), 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al actualizar el producto: {str(e)}"}, 500

    @role_required(roles=['ADMIN'])
    def delete(self, id):
        try:
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404
            db.session.delete(producto)
            db.session.commit()
            return {"mensaje": "Producto eliminado con éxito"}, 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al eliminar el producto: {str(e)}"}, 500
