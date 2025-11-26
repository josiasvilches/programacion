from flask_restful import Resource
from flask import request
from datetime import datetime
from .. import db
from main.models import CampanaModel
from flask_jwt_extended import jwt_required, get_jwt_identity
from main.auth.decorators import role_required


class Campanas(Resource):
    @jwt_required()
    @role_required(roles=['ADMIN'])
    def get(self):
        try:
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 10, type=int)
            estado = request.args.get('estado', type=str)  # activa, pausada, finalizada

            # Query base
            query = CampanaModel.query

            # Aplicar filtros
            if estado:
                query = query.filter(CampanaModel.estado == estado)

            # Ordenar por fecha de creación (más recientes primero)
            query = query.order_by(CampanaModel.fecha_creacion.desc())

            # Paginación
            campanas_paginadas = query.paginate(
                page=page,
                per_page=per_page,
                error_out=False
            )

            campanas = [campana.to_json() for campana in campanas_paginadas.items]

            return {
                'campanas': campanas,
                'total': campanas_paginadas.total,
                'pages': campanas_paginadas.pages,
                'page': page
            }, 200

        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    @jwt_required()
    @role_required(roles=['ADMIN'])
    def post(self):
        try:
            data = request.get_json()

            # Validar campos requeridos
            if not data.get('titulo'):
                return {'mensaje': 'El título es requerido'}, 400
            if not data.get('mensaje'):
                return {'mensaje': 'El mensaje es requerido'}, 400

            # Crear nueva campaña
            nueva_campana = CampanaModel(
                titulo=data['titulo'],
                mensaje=data['mensaje'],
                descuento=data.get('descuento'),
                estado=data.get('estado', 'activa'),
                fecha_inicio=datetime.fromisoformat(data['fecha_inicio']) if data.get('fecha_inicio') else None,
                fecha_fin=datetime.fromisoformat(data['fecha_fin']) if data.get('fecha_fin') else None
            )

            db.session.add(nueva_campana)
            db.session.commit()

            return nueva_campana.to_json(), 201

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500


class Campana(Resource):
    @jwt_required()
    @role_required(roles=['ADMIN'])
    def get(self, id):
        try:
            campana = CampanaModel.query.get_or_404(id)
            return campana.to_json(), 200
        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    @jwt_required()
    @role_required(roles=['ADMIN'])
    def put(self, id):
        try:
            campana = CampanaModel.query.get(id)
            if not campana:
                return {'mensaje': 'Campaña no encontrada'}, 404

            data = request.get_json()

            # Actualizar campos
            if 'titulo' in data:
                campana.titulo = data['titulo']
            if 'mensaje' in data:
                campana.mensaje = data['mensaje']
            if 'descuento' in data:
                campana.descuento = data['descuento']
            if 'estado' in data:
                campana.estado = data['estado']
            if 'fecha_inicio' in data:
                campana.fecha_inicio = datetime.fromisoformat(data['fecha_inicio']) if data['fecha_inicio'] else None
            if 'fecha_fin' in data:
                campana.fecha_fin = datetime.fromisoformat(data['fecha_fin']) if data['fecha_fin'] else None

            db.session.commit()
            return campana.to_json(), 200

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500

    @jwt_required()
    @role_required(roles=['ADMIN'])
    def delete(self, id):
        try:
            campana = CampanaModel.query.get(id)
            if not campana:
                return {'mensaje': 'Campaña no encontrada'}, 404

            # En lugar de eliminar, cambiar estado a finalizada
            campana.estado = 'finalizada'
            db.session.commit()

            return {'mensaje': 'Campaña finalizada exitosamente'}, 200

        except Exception as e:
            db.session.rollback()
            print("ERROR:", str(e))
            return {'error': str(e)}, 500


class CampanasActivas(Resource):
    def get(self):
        try:
            campanas = CampanaModel.query.filter_by(estado='activa').order_by(
                CampanaModel.fecha_creacion.desc()
            ).all()

            return {
                'campanas': [campana.to_json() for campana in campanas]
            }, 200

        except Exception as e:
            print("ERROR:", str(e))
            return {'error': str(e)}, 500
