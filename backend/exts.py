from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads


photos = UploadSet("photos", extensions=('jpg', 'jpeg', 'png'))

db = SQLAlchemy()