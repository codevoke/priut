from http import HTTPStatus
from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token
from passlib.hash import pbkdf2_sha256

from models import UserModel


class Auth(Resource):
    @classmethod    
    def post(cls):
        args = request.get_json()
        if not args or not args.get('username') or not args.get('password'):
            return {'message': 'Missing username or password'}, HTTPStatus.BAD_REQUEST
        

        user = UserModel.find_by_username(args['username'])
        if not user:
            return {'message': 'User not found'}, HTTPStatus.NOT_FOUND
        
        if not pbkdf2_sha256.verify(args['password'], user.password):
            return {'message': 'Password is incorrect'}, HTTPStatus.BAD_REQUEST
        
        access_token = create_access_token(identity=user.id)
        return {'access_token': access_token}