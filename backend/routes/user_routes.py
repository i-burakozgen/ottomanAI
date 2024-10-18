from flask import Blueprint, request, jsonify
from Services.user_service import UserService
from middleware.middleware import token_required

user_bp = Blueprint("auth", __name__)



@user_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if data is None:
        return jsonify({"message": "Invalid JSON format"}), 400
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    
    if not username or not email or not password:
        return jsonify({"message": "Fill all the fields"}), 400
    
    response, status_code = UserService.RegisterUser(username, email, password)
    return jsonify(response), status_code


@user_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"message":"email and password required to login"})
    
    response, status_code = UserService.LoginUser(email, password)
    return jsonify(response), status_code

@user_bp.route("/profile", methods=["GET"])
@token_required
def getProfile(current_user):
    return jsonify({
        "user_id": current_user.Id,
        "userName":current_user.UserName,
        "email":current_user.email,
    }), 200
    
@user_bp.route("/delete", methods=["DELETE"])
@token_required
def deleteUser(current_user):
    response, status_code = UserService.delete_user(current_user)
    return jsonify(response), status_code