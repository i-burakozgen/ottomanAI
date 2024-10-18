from flask import Flask,jsonify, request
from flask_restx import Api, Resource
from config import DevConfig
from flask_migrate import Migrate
from models.models import Words, Variations, Meanings, PersianTransliterations
from flask_sqlalchemy import SQLAlchemy
from exts import db
from middleware.middleware import token_required 
from routes.user_routes import user_bp

app = Flask(__name__)
app.config.from_object(DevConfig)
api = Api(app,doc = '/docs')

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(user_bp, url_prefix="/auth")





@api.route('/api/words/<string:word_name>', methods=["GET"])
class WordResource(Resource):
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
    
 
        """
        validate user
        get image and limit 3 to per day for user
        store images refers to user 
        process images // later implementation 
        delete images
        
        """   
    
    
    
if __name__ == "__main__":
    app.run(port=3000)