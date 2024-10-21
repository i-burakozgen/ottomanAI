from models.models import User
from exts import db
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from flask import current_app
from datetime import datetime, timedelta



class UserService:
        
    @staticmethod
    def RegisterUser(username, email, password):
    
        if User.query.filter_by(email = email).first() is not None:
            return {"message":"Mail already exist"}, 400
        if User.query.filter_by(UserName = username).first() is not None:
            return {"message": "Username already exist"}, 400
        try:
            hashed_password = generate_password_hash(password)
            new_user = User(UserName = username, email = email, password = hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return {"message": "Registered successfully"}, 201
        except Exception as e:
            return {"message": "Error registering user", "error": str(e)}, 500
        
    @staticmethod
    def LoginUser(email, password):
        user = User.query.filter_by(email = email).first()
        if not user or not check_password_hash(user.password, password):
            return {"message": "invalid email or password"}
        
        expiration_time = datetime.utcnow() + timedelta(hours=24)

        token = jwt.encode({
        "userId": user.Id,
        "expires": expiration_time.strftime("%Y-%m-%d %H:%M:%S") 
    }, current_app.config["SECRET_KEY"], algorithm="HS256")
        return {
        "message": "Login Successful",
        "token": token,
        "userId": user.Id,
        "username": user.UserName,
        "expires": expiration_time.strftime("%Y-%m-%d %H:%M:%S")  # Include formatted expiration in response
    }, 200
        
    @staticmethod
    def delete_user(user):
        try:
            current_user.delete()
            return {"message":"Account deleted successfully"},200
        except Exception as e:
            return {"message": "Error deleting user", "error": str(e)}, 500
                   
    @staticmethod
    def getUserById(id):
        return User.query.get(Id = id)
    
    @staticmethod
    def getUserByName(username):
        return User.query.filter_by(UserName = username).first()
    
        