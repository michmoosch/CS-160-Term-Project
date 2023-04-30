from flask import Flask
from api.config import Config
from api.models import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS

jwt = JWTManager()
cors = CORS()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)

    from api.app import route_bp
    app.register_blueprint(route_bp)

    return app