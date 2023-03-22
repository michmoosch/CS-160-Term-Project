 from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128))
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))


class Product(db.Model):
    prodid = db.Column(db.INT, primary_key=True, nullable=False)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT)
    prodUnitPrice = db.Column(db.DOUBLE)
    prodUnitInStock = db.Column(db.INT)
    prodUnitWeight = db.Column(db.DOUBLE)

class ShoppingSession(db.Model):
    cartID = db.Column(db.INT, primary_key=True, nullable=False)
    cartUserID = db.relationship('User', backref='cartsession', lazy=True)
    cartTotal = db.Column(db.DOUBLE)

class CartItem(db.Model):
    cartItemID = db.Column(db.INT, primarary_key=True, nullable=False)
    sessionID = db.relationship('ShoppingSession', backref='item', lazy=True)
    prodID = db.relationship('Product', backref='cart', lazy=True)
    quantity = db.Column(db.INT)



