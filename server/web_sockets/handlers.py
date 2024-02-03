from flask import request
from flask_socketio import rooms, join_room
from .ws_server import ws_server as ws


@ws.on("connect")
def test(data):
    user_ip = request.headers.get('X-Forwarded-For')
    join_room(user_ip)
    print(rooms())


@ws.on("test")
def test2(data):
    user_ip = request.headers.get('X-Forwarded-For')
    join_room(user_ip)
    print(rooms())
