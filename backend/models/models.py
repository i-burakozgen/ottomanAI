from exts import db
class Words(db.Model):
    __tablename__ = "Words"
    Id = db.Column(db.Integer, primary_key=True)
    WordName = db.Column(db.String, nullable = False)
    Variations = db.relationship("Variations", back_populates="Word")
    PersianTransliterations = db.relationship("PersianTransliterations", back_populates="Word")
    Meanings = db.relationship("Meanings", back_populates = "Word")


class Variations(db.Model):
    __tablename__ = 'Variations'

    Id = db.Column(db.Integer, primary_key=True)
    WordId = db.Column(db.Integer, db.ForeignKey('Words.Id'))
    VariationName = db.Column(db.String)  
    Word = db.relationship("Words", back_populates="Variations")


class Meanings(db.Model):
    __tablename__ = 'Meanings'

    Id = db.Column(db.Integer, primary_key=True)
    WordId = db.Column(db.Integer, db.ForeignKey('Words.Id'))
    MeaningName =db.Column(db.String)
    Word = db.relationship("Words", back_populates="Meanings")  

class PersianTransliterations(db.Model):
    __tablename__ = 'PersianTransliterations'

    Id = db.Column(db.Integer, primary_key=True)
    WordId = db.Column(db.Integer, db.ForeignKey('Words.Id'))
    PersiantransliterationName =db.Column(db.String)  
    Word = db.relationship("Words", back_populates="PersianTransliterations")   