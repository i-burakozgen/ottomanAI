from flask_restx import Resource, Namespace
from models.models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from sqlalchemy import func
from exts import db
from flask import Flask,jsonify, request
from flask_restx import Api, Resource, fields



auth_ns = Namespace("auth", description="Namespace for Authentication")


signup_model = auth_ns.model(
    "signup",{
        "username":fields.String(attribute="UserName"),
        "email":fields.String(),
        "password":fields.String(),
    }
)

login_model = auth_ns.model(
    "login",{
        "username":fields.String(attribute="UserName"),
        "password": fields.String(),
    }
)

@auth_ns.route("/signup")
class Signup(Resource):
    @auth_ns.expect(signup_model)
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
    
    
@auth_ns.route("/login") 
class Login(Resource):
    
    @auth_ns.expect(login_model)
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
        