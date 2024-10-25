
from models.models import Words, Variations, Meanings, PersianTransliterations,User, Image
from flask_restx import Namespace, Resource
from flask import Flask,jsonify, request
from flask_restx import Api, Resource, fields


dictionary_ns = Namespace("dictionary", description="A namespace for dictionary")


word_model = dictionary_ns.model(
    "Word", {
        "WordName": fields.String(required=True, description="The word name"),
        "Meanings": fields.List(fields.String, description="List of word meanings"),
        "PersianTransliterations": fields.List(fields.String, description="List of Persian transliterations"),
        "Variations": fields.List(fields.String, description="List of word variations"),

    }
)

@dictionary_ns.route('/dictionary_ns/words/<string:word_name>', methods=["GET"])
class WordResource(Resource):
    @dictionary_ns.response(200, 'Success', word_model)
    @dictionary_ns.response(404, 'Transliteration Not Found')    
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
 
@dictionary_ns.route("/dictionary_ns/transliteration_ottoman/<string:transliteration_name>",methods=["GET"])
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
