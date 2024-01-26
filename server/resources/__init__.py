from flask_restful import Api

from .post import Post
from .auth import Auth
from .user import User


api = Api(prefix="/api")

api.add_resource(Post, '/create-post')
api.add_resource(Auth, '/auth')
api.add_resource(User, '/user')
