import asyncio
import requests
from http import HTTPStatus
from flask import request, current_app
from flask_restful import Resource
from flask_jwt_extended import jwt_required

from models import PostModel


class Post(Resource):
    @classmethod
    def get(cls):
        return {"posts": [p.json() for p in PostModel.query.all()]}, 200
        
    @classmethod
    @jwt_required()
    def post(cls):
        args = request.get_json()
        if not args or not args.get('title') or not args.get('content'):
            return {'message': 'Missing title or content'}, HTTPStatus.BAD_REQUEST
        
        post = PostModel(
            title=args['title'], 
            content=args['content']
        )
        post.save_to_db()
        asyncio.run(upload_photo_to_cdn(args['image'], post))
        return post.json()


async def upload_photo_to_cdn(image_content, post):
    res = requests.post(current_app.config.get('CDN_URL') + '/upload-image', 
                      json={'image': image_content, 'post_id': post.id})
    
    if res.status_code == 200: 
        post.patch(new_image=res.text)
        post.save_to_db()
