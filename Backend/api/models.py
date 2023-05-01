
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime, func, ForeignKey

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.VARCHAR(64),unique=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128), nullable=False)
    fname = db.Column(db.VARCHAR(64), nullable=False)
    lname = db.Column(db.VARCHAR(64), nullable=False)
    isAdmin = db.Column(db.Boolean, server_default='FALSE')
    address = db.Column(db.TEXT)

class Product(db.Model):
    __tablename__ = 'Product'
    prodid = db.Column(db.Integer, primary_key=True)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT, nullable=False)
    prodUnitPrice = db.Column(db.DOUBLE, nullable=False)
    prodUnitInStock = db.Column(db.Integer, nullable=False)
    prodUnitWeight = db.Column(db.DOUBLE, nullable=False)
    categoryId = db.Column(db.Integer, ForeignKey("Category.categoryId", ondelect="CASCADE"), unique=True, nullable=False)

class Category(db.Model):
    __tablename__ = "Category"
    categoryId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR(64))

class OrderDetail(db.Model):
    __tablename__ = 'OrderDetail'
    orderDetailId = db.Column(db.Integer, primary_key=True, autoincrement=True, unique=True)
    uid = db.Column(db.Integer, ForeignKey("user.uid", "CASCADE"), primary_key=True)
    total = db.Column(db.Double)
    deliveryMethod = db.Column(db.Enum('Truck', 'Pickup', 'Drone'))
    status = db.Column(db.Enum('Completed', 'In Progress'), default='In Progress')
    created_at = db.Column(db.DateTime())

class OrderItem(db.Model):
    __tablename__ = 'OrderItem'
    orderItemId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quantity = db.Column(db.Integer)
    OrderDetailId = db.Column(db.Integer, ForeignKey("OrderDetail.orderDetailId", "CASCADE"), nullable=False)
    prodid = db.Column(db.Integer, ForeignKey("Product.prodid", "CASCADE"), unique=True, nullable=False)

class Driver(db.Model):
    __tablename__ = 'Driver'
    driverId = db.Column(db.Integer, autoincrement=True, nullable=False, primarykey=True)
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    status = db.Column(db.Enum('Active', 'In Progress'), default='Active')
    Address = db.Column(db.TEXT)
    orderDetailId = db.Column(db.Integer, ForeignKey("OrderDetail.orderDetailId", "CASCADE"), unique=True)


