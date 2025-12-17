from flask_restful import Resource
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from main.auth.decorators import role_required
from .. import db
from main.models import ProductoModel as ProductoModel, UsuarioModel as UsuarioModel, CategoriaModel, ValoracionModel
from sqlalchemy import func

class Productos(Resource):
    def get(self):
        try:
            
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
            
            # Filtrar por precio (nuevo formato con precio_min y precio_max)
            if request.args.get('precio_min') or request.args.get('precio_max'):
                if request.args.get('precio_min') and request.args.get('precio_max'):
                    min_precio = int(request.args.get('precio_min'))
                    max_precio = int(request.args.get('precio_max'))
                    productos = productos.filter(ProductoModel.precio.between(min_precio, max_precio))
                elif request.args.get('precio_min'):
                    min_precio = int(request.args.get('precio_min'))
                    productos = productos.filter(ProductoModel.precio >= min_precio)
                elif request.args.get('precio_max'):
                    max_precio = int(request.args.get('precio_max'))
                    productos = productos.filter(ProductoModel.precio <= max_precio)
            # Filtrar por precio (formato antiguo para compatibilidad)
            elif request.args.getlist('precios'):
                min_precio, max_precio = request.args.getlist('precios')
                print(min_precio, max_precio)
                productos = productos.filter(ProductoModel.precio.between(min_precio, max_precio))
            
            # Filtrar por id_categoria
            if request.args.get('id_categoria'):
                id_cat = request.args.get('id_categoria')
                print(f"Filtrando por id_categoria: {id_cat}")
                productos = productos.filter(ProductoModel.id_categoria == int(id_cat))

            # Ordenar por valoración promedio descendente (mayor a menor)
            # Calculamos el promedio de valoraciones para cada producto
            productos = productos.outerjoin(ValoracionModel, ProductoModel.producto_id == ValoracionModel.id_producto)
            productos = productos.group_by(ProductoModel.producto_id)
            productos = productos.order_by(func.coalesce(func.avg(ValoracionModel.valoracion), 0).desc())

            print(f"Paginando: page={page}, per_page={per_page}")
            productos = productos.paginate(page=page, per_page=per_page, error_out=False)
            
            print(f"Productos encontrados: {productos.total}")

            # Verificar JWT de manera opcional
            current_identity = None
            try:
                verify_jwt_in_request(optional=True)
                current_identity = get_jwt_identity()
            except:
                current_identity = None

            if current_identity:
                usuario = db.session.query(UsuarioModel).get(current_identity)
                if usuario and usuario.rol == 'ADMIN':
                    productos_json = [producto.to_json_complete() for producto in productos.items]
                elif usuario and usuario.rol == 'USER':
                    productos_json = [producto.to_json() for producto in productos.items]
                else:
                    productos_json = [producto.to_json() for producto in productos.items]
            else:
                productos_json = [producto.to_json() for producto in productos.items]

            response_data = {
                'productos': productos_json,
                'total': productos.total,
                'pages': productos.pages,
                'page': page,
                'per_page': per_page,
                'total_pages': productos.pages
            }
            
            print(f"Respuesta: {len(productos_json)} productos, página {page} de {productos.pages}")
            
            return jsonify(response_data)
        except Exception as e:
            import traceback
            print("ERROR COMPLETO:", str(e))
            print("TRACEBACK:", traceback.format_exc())
            return {'error': str(e), 'mensaje': 'Error al obtener productos'}, 500
    
    @role_required(roles=['ADMIN', 'TRABAJADOR'])
    def post(self):
        try:
            current_identity = get_jwt_identity()
            if not isinstance(current_identity, str):
                return {"mensaje": "Identidad del token no válida"}, 400

            data = request.get_json() or {}
            print(data)
            if not all(key in data for key in ('nombre', 'precio')):
                return {"mensaje": "Faltan datos requeridos ('nombre', 'precio')"}, 400

            nuevo_producto = ProductoModel(
                nombre=data['nombre'],
                precio=data['precio'],
                stock=data.get('stock', 0),  # Default 0 si no se proporciona
                id_categoria=data.get('id_categoria'),
                descripcion=data.get('descripcion'),
                imagen_url=data.get('imagen_url'),
                disponible=data.get('disponible', True)  # Default True
            )
            db.session.add(nuevo_producto)
            db.session.commit()
            return nuevo_producto.to_json_complete(), 201

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
            
            # Obtener datos del producto
            producto_data = producto.to_json_complete()
            
            # Buscar el nombre de la categoría si existe id_categoria
            if producto.id_categoria:
                categoria = db.session.query(CategoriaModel).get(producto.id_categoria)
                if categoria:
                    producto_data['categoria'] = categoria.nombre_categoria
                    print(f"Producto con categoría: {categoria.nombre_categoria}")
                else:
                    producto_data['categoria'] = None
                    print("Categoría no encontrada")
            else:
                producto_data['categoria'] = None
            
            print(f"Producto completo: {producto_data}")
            
            current_identity = get_jwt_identity()
            if current_identity:
                usuario = db.session.query(UsuarioModel).get(current_identity)
                if usuario.rol == 'ADMIN':
                    return producto_data, 200
                elif usuario.rol == 'cliente':
                    return producto_data, 200
                else:
                    return producto_data, 200
            else:
                return producto_data, 200
        except Exception as e:
            import traceback
            print("ERROR:", str(e))
            print("TRACEBACK:", traceback.format_exc())
            return {'error': str(e)}, 500

    @role_required(roles=['ADMIN', 'TRABAJADOR'])
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
            if 'disponible' in data:
                producto.disponible = data['disponible']
            
            db.session.commit()
            return producto.to_json_complete(), 200
        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {"mensaje": f"Error al actualizar el producto: {str(e)}"}, 500

    @role_required(roles=['ADMIN', 'TRABAJADOR'])
    def delete(self, id):
        print('eliminando')
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


class ProductoValoraciones(Resource):
    """
    Obtener todas las valoraciones de un producto específico
    """
    def get(self, id):
        try:
            from main.models import ValoracionModel, UsuarioModel
            
            # Verificar que el producto existe
            producto = ProductoModel.query.get(id)
            if producto is None:
                return {"mensaje": "Producto no encontrado"}, 404
            
            # Obtener valoraciones del producto con información del usuario
            valoraciones = db.session.query(
                ValoracionModel,
                UsuarioModel.nombre
            ).join(
                UsuarioModel,
                ValoracionModel.id_usuario == UsuarioModel.usuario_id
            ).filter(
                ValoracionModel.id_producto == id
            ).order_by(
                ValoracionModel.valoracion_id.desc()
            ).all()
            
            # Formatear respuesta
            valoraciones_json = []
            for valoracion, nombre in valoraciones:
                val_dict = valoracion.to_json()
                val_dict['nombre_usuario'] = nombre
                valoraciones_json.append(val_dict)
            
            # Calcular promedio
            promedio = 0
            if valoraciones_json:
                suma = sum(v['valoracion'] for v in valoraciones_json)
                promedio = round(suma / len(valoraciones_json), 2)
            
            return {
                'valoraciones': valoraciones_json,
                'total': len(valoraciones_json),
                'promedio': promedio
            }, 200
            
        except Exception as e:
            import traceback
            print("ERROR:", str(e))
            print("TRACEBACK:", traceback.format_exc())
            return {'error': str(e)}, 500
