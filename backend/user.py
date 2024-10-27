from models.models import Words, Variations, Meanings, PersianTransliterations,User, Image
from flask_restx import Namespace, Resource, Resource
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from exts import db, photos
from flask import Flask,jsonify, request
from sqlalchemy import and_ , func
from flask_uploads import UploadSet, configure_uploads
from datetime import datetime



user_ns = Namespace("user", description="Namespace for user methods")


@user_ns.route("/profile_view")
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
            
            
@user_ns.route("/delete_user")
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


@user_ns.route("/upload")
class imageUpload(Resource):
    @jwt_required()
    def post(self):
        
        
        current_user = get_jwt_identity()
        db_user = User.query.filter_by(UserName=current_user).first()

        today = datetime.utcnow().date()
        upload_count =Image.query.filter(
            Image.UserId == db_user.Id,
            func.date(Image.UploadTime) == today
        ).count()
        if upload_count >= 3:
            return {"message": "You can upload a maximum of 3 images per day."}, 403
        
        if 'photo' not in request.files:
            return {"message": "No image file provided."}, 400
        file = request.files['photo']
        
        if file and file.filename:
            filename = photos.save(file)
            image_path = f"static/uploads/{filename}"
            new_image = Image(UserId=db_user.Id, ImagePath=image_path) 
            db.session.add(new_image)
            db.session.commit()
            
            return {"message": "Image uploaded successfully", "image_path": image_path}, 201
        
        return {"message": "Error occurred while uploading the image."}, 500
    
    
@user_ns.route("/refresh")
class Refresh_Token(Resource):
    @jwt_required(refresh=True)
    def post():
        current_user = get_jwt_identity()
        new_accsess_token = create_access_token(identity=current_user)
        return make_response(jsonify({"accsess token": new_accsess_token}),200)
        
    
