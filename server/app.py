import os

from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from models import db
from resources import api
from web_sockets import ws_server

from init_admin import initialize_database

app = Flask(__name__)
CORS(app)

# use .env file for debugging.
# in production comment this line and use host environment variables
load_dotenv()

# create jwt manager object for configuring app with jwt
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# configure database
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('PRODUCTION_DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["PROPAGATE_EXCEPTIONS"] = True

# configure cdn url
app.config["CDN_URL"] = os.getenv('CDN_URL')

# initialization app to database
db.init_app(app)
with app.app_context():
    initialize_database()

# initialization app to migrate
migrate = Migrate(app, db)

# initialization app to api
api.init_app(app)

# initialization app to websocket server
ws_server.init_app(app)


# for debug uncomment next 2 line or run in cmd `flask start`
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
