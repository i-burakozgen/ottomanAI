from flask import Flask,jsonify, request
from flask_restx import Api, Resource, fields
from config import DevConfig
from flask_migrate import Migrate
from models.models import Words, Variations, Meanings, PersianTransliterations,User
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from sqlalchemy import func

app = Flask(__name__)
app.config.from_object(DevConfig)
api = Api(app,doc = '/docs')

db.init_app(app)
migrate = Migrate(app, db)
JWTManager(app)


word_model = api.model(
    "Word", {
        "WordName": fields.String(required=True, description="The word name"),
        "Variations": fields.List(fields.String, description="List of word variations"),
        "Meanings": fields.List(fields.String, description="List of word meanings"),
        "PersianTransliterations": fields.List(fields.String, description="List of Persian transliterations"),
    }
)


signup_model = api.model(
    "signup",{
        "username":fields.String(attribute="UserName"),
        "email":fields.String(),
        "password":fields.String(),
    }
)

login_model = api.model(
    "login",{
        "username":fields.String(attribute="UserName"),
        "password": fields.String(),
    }
)

@api.route('/api/words/<string:word_name>', methods=["GET"])
class WordResource(Resource):    
    @api.expect(word_model)
    def get(self, word_name):
        word = Words.query.filter_by(WordName=word_name).first()
        if word:
            return jsonify({
                "WordName": word.WordName,
                "Variations": [variation.VariationName for variation in word.Variations],
                "Meanings": [meaning.MeaningName for meaning in word.Meanings],
                "PersianTransliterations": [transliteration.PersiantransliterationName for transliteration in word.PersianTransliterations],
            })
        return jsonify({"error": "Word not found"}), 404
 
@api.route("/api/transliteration_ottoman/<string:transliteration_name>",methods=["GET"])
class OttomanResource(Resource):
    def get(self, transliteration_name):
        transliteration = PersianTransliterations.query.filter_by(PersiantransliterationName = transliteration_name).first()
        if transliteration:
            word = transliteration.Word
            return jsonify({
                "WordName": word.WordName,
                "Variations":[variation.VariationName for variation in word.Variations],
                "Meanings":[meaning.MeaningName for meaning in word.Meanings],
                "PersianTransliterations":[transliteration.PersiantransliterationName for transliteration in word.PersianTransliterations],
            })
        return jsonify({"error": "Transliteration Not Found"}), 404  

@api.route("/signup")
class Signup(Resource):
    @api.expect(signup_model)
    def post(self):
        data = request.get_json()
        
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        
        db_user = User.query.filter_by(UserName=username).first()
        if db_user is not None:
            return ({"message": f"User with username {username} already exists"}), 400
        
        db_user_mail = User.query.filter_by(email=email).first()
        if db_user_mail is not None:
            return ({"message":f"User with {email} is already exist"}),400
        
        hashed_password = generate_password_hash(password)
        try:
            new_user = User(
                UserName= username,
                email = email,
                password = hashed_password,
            )
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            return ({"message": "error occurred while creating user"})
        return {
                "id": new_user.Id,
                "username": new_user.UserName,
                "email": new_user.email,
            }, 201
    
    
@api.route("/login") 
class Login(Resource):
    
    @api.expect(login_model)
    def post(self):
            data = request.get_json()    
            username = data.get("username")
            password = data.get("password")    
            print(f"Attempting to log in user: {username}")  # Debug log
            
            db_user = User.query.filter(func.lower(User.UserName) == func.lower(username)).first()
            if db_user is None:
                print(f"User not found in the database: '{username}'")  # Debug log
                return {"message": f"user with username '{username}' does not exist"}, 404
            print(f"User found in DB: Username: '{db_user.UserName}', Hashed Password: '{db_user.password}'")

            
            if check_password_hash(db_user.password, password):
                access_token = create_access_token(identity=db_user.UserName)
                refresh_token = create_refresh_token(identity=db_user.UserName)
                return {
                    "username": username,
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }, 201
            else:
                print("Password is incorrect.")  # Debug log
                return {"message": "Invalid password"}, 401
        
@api.route("/profile_view")
class ProfileView(Resource):
    @jwt_required()
    def get(self):
        current_user = get_jwt_identity()
        
        db_user = User.query.filter_by(UserName=current_user).first()
        if db_user is None:
            return {"message":"User not found"}, 400
        else:
            return {
                "username":db_user.UserName,
                "email":db_user.email
            },200
            
            
@api.route("/delete_user")
class DeleteUser(Resource):
    @jwt_required()
    def delete(self):
        current_user = get_jwt_identity()
        print(f"Current user identity from token: {current_user}")
        db_user = User.query.filter_by(UserName=current_user).first()
        if db_user is None:
            return {"message": "User not found, please login."}, 400
        else:
            try:
                db.session.delete(db_user)
                db.session.commit()
                return {"message": f"user with {current_user} has been deleted"}  # Corrected syntax
            except Exception as e:
                db.session.rollback()
                return {"message": "Error occurred while deleting user"}, 500
        
    
if __name__ == "__main__":
    app.run(port=3000)