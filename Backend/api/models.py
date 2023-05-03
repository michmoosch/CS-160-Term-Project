
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import DateTime, func, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    uid = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(db.VARCHAR(64),unique=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128), nullable=False)
    fname = db.Column(db.VARCHAR(64), nullable=False)
    lname = db.Column(db.VARCHAR(64), nullable=False)
    isAdmin = db.Column(db.Boolean, server_default='FALSE')
    address = db.Column(db.TEXT)
    orders = db.relationship('OrderDetail', back_populates="user")

class Category(db.Model):
    __tablename__ = "Category"
    categoryId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.VARCHAR(64))
    product = db.relationship("Product", back_populates="categories")

class Product(db.Model):
    __tablename__ = 'Product'
    prodid = db.Column(db.Integer, nullable=False, primary_key=True)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT)
    prodUnitPrice = db.Column(db.DOUBLE, nullable=False)
    prodUnitInStock = db.Column(db.Integer, nullable=False)
    prodUnitWeight = db.Column(db.DOUBLE, nullable=False)
    prodStripeId = db.Column(db.VARCHAR(64), nullable=False)
    prodImagePath = db.Column(db.VARCHAR(128))
    categoryId = db.Column(db.Integer, db.ForeignKey("Category.categoryId", ondelete="CASCADE"), unique=True, nullable=False)
    categories = db.relationship("Category", back_populates="product")

class OrderDetail(db.Model):
    __tablename__ = 'OrderDetail'
    orderDetailId = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    uid = db.Column(db.Integer, db.ForeignKey("user.uid", "CASCADE"), primary_key=True)
#    total = db.Column(db.Double)
#    deliveryMethod = db.Column(db.Enum('Truck', 'Pickup', 'Drone'))
#    status = db.Column(db.Enum('Completed', 'In Progress'), default='In Progress')
    created_at = db.Column(db.DateTime())
    user = db.relationship('User', back_populates='orders')

#class OrderItem(db.Model):
#    __tablename__ = 'OrderItem'
#    orderItemId = db.Column(db.Integer, primary_key=True, autoincrement=True)
#    quantity = db.Column(db.Integer)
#    OrderDetailId = db.Column(db.Integer, db.ForeignKey("OrderDetail.orderDetailId", "CASCADE"), nullable=False)
#    prodid = db.Column(db.Integer, db.ForeignKey("Product.prodid", "CASCADE"), unique=True, nullable=False)

class Driver(db.Model):
    __tablename__ = 'Driver'
    driverId = db.Column(db.Integer, autoincrement=True, nullable=False, primary_key=True)
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    status = db.Column(db.Enum('Active', 'In Progress'), default='Active')
    Address = db.Column(db.TEXT)
    orderDetailId = db.Column(db.Integer, db.ForeignKey("OrderDetail.orderDetailId", "CASCADE"), unique=True)