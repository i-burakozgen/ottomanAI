from exts import db
from datetime import datetime


# preready tables on database 
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
    
    
    
    # USER MODEL ALSO WITH IMAGE PROP 
    """
    Class User(db.Model):
        Id = db.Column(db.Integer, primary_key=True)
        UserName = string
        email = string
        password = string
        Images = relationship many to one
        def __repr__(self):
            return f"User{self.UserName}
    
    class Image(db.Model):
        Id = integer
        ImagePath = string
        date = datetime
        UserId = relation ship one to many 
    """
    
    
class User(db.Model):
    __tablename__ = "User"
    Id = db.Column(db.Integer, primary_key=True)
    UserName = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    Images = db.relationship("Image", backref="User")
    def __repr__(self):
        return f"<User:{self.UserName}>"
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    
class Image(db.Model):
    __tablename__ = "Image"
    Id = db.Column(db.Integer, primary_key=True)
    UserId = db.Column(db.Integer, db.ForeignKey("User.Id"), nullable=False)
    ImagePath = db.Column(db.String(256), nullable=False)
    UploadTime = db.Column(db.DateTime, default = datetime.utcnow)
    def __repr__(self):
        return f"<Image uploaded by {self.UserId} and create at {self.UploadTime}>"
    
    
    
      
    
    