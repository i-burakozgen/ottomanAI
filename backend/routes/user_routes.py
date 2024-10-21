from flask import Blueprint, request, jsonify
from flask_restx import Api, Resource, fields, Namespace
from Services.user_service import UserService
from middleware.middleware import token_required


user_bp = Blueprint("auth", __name__)

user_ns = Namespace('auth', description='User operations')

# Define models for request and response validation
signup_model = user_ns.model("Signup", {
    "username": fields.String(required=True, description="The username of the user"),
    "email": fields.String(required=True, description="The email of the user"),
    "password": fields.String(required=True, description="The password of the user"),
})

login_model = user_ns.model("Login", {
    "email": fields.String(required=True, description="The email of the user"),
    "password": fields.String(required=True, description="The password of the user"),
})

profile_model = user_ns.model("Profile", {
    "user_id": fields.Integer(description="The ID of the user"),
    "username": fields.String(description="The username of the user"),
    "email": fields.String(description="The email of the user"),
})

delete_model = user_ns.model("Delete", {
    "message": fields.String(description="Message confirming deletion"),
})

# Route for user signup
@user_ns.route("/signup")
class Signup(Resource):
    @user_ns.expect(signup_model)
    @user_ns.response(201, 'User successfully registered.')
    @user_ns.response(400, 'Invalid input.')
    def post(self):
        """Register a new user"""
        data = request.get_json()
        return UserService.RegisterUser(data['username'], data['email'], data['password'])

# Route for user login
@user_ns.route("/login")
class Login(Resource):
    @user_ns.expect(login_model)
    @user_ns.response(200, 'Login successful.')
    @user_ns.response(401, 'Invalid email or password.')
    def post(self):
        """Login a user"""
        data = request.get_json()
        return UserService.LoginUser(data['email'], data['password'])

# Route for getting user profile
@user_ns.route("/profile")
class UserProfile(Resource):
    @token_required
    @user_ns.response(200, 'User profile retrieved.')
    @user_ns.marshal_with(profile_model)
    def get(self, current_user):
        """Get the current user's profile"""
        return {
            "user_id": current_user.Id,
            "username": current_user.UserName,
            "email": current_user.email,
        }

# Route for deleting user account
@user_ns.route("/delete")
class DeleteUser(Resource):
    @token_required
    @user_ns.response(200, 'User account deleted.')
    @user_ns.marshal_with(delete_model)
    def delete(self, current_user):
        """Delete the current user's account"""
        response, status_code = UserService.delete_user(current_user)
        return response, status_code
