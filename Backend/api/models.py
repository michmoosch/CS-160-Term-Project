from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128))
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))

