from http import HTTPStatus
from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from passlib.hash import pbkdf2_sha256

from models import UserModel


class User(Resource):    
    @classmethod
    @jwt_required()
    def patch(cls):
        identity = get_jwt_identity()
        args = request.get_json()

        if not args or not args.get('new_password'):
            return {'message': 'Missing password'}, HTTPStatus.BAD_REQUEST
        
        user = UserModel.find_by_id(identity)
        user.patch(
            new_password = pbkdf2_sha256.hash(args['new_password'])
        )
        user.save_to_db()
        
        return {'message': 'Password updated'}, HTTPStatus.OK
