from flask import Flask
from flask_restx import Api
from config import DevConfig
from flask_migrate import Migrate
from exts import db, photos
from flask_jwt_extended import JWTManager
from flask_uploads import UploadSet, configure_uploads
from auth import auth_ns
from user import user_ns
from dictionary import dictionary_ns
from flask_cors import CORS




def factoryCreateApp(config):
    app = Flask(__name__)
    app.config.from_object(config)
    api = Api(app,doc = '/docs')

    db.init_app(app)
    migrate = Migrate(app, db)
    JWTManager(app)
    configure_uploads(app, photos)
    api.add_namespace(auth_ns)
    api.add_namespace(dictionary_ns)
    api.add_namespace(user_ns)
    CORS(app)
    
    return app