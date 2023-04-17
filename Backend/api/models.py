from flask_sqlalchemy import SQLAlchemy, ForeignKey



db = SQLAlchemy()


class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.VARCHAR(64), nullable=False)
    pwd = db.Column(db.VARCHAR(128), nullable=False)
    fname = db.Column(db.VARCHAR(64), nullable=False)
    lname = db.Column(db.VARCHAR(64), nullable=False)
    isAdmin = db.Column(db.Boolean, default=False)
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(64))
    state = db.Column(db.VARCHAR(64))
    zipcode = db.Column(db.Integer)

class Product(db.Model):
    prodid = db.Column(db.Integer, primary_key=True)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT, nullable=False)
    prodUnitPrice = db.Column(db.DOUBLE, nullable=False)
    prodUnitInStock = db.Column(db.Integer, nullable=False)
    prodUnitWeight = db.Column(db.DOUBLE, nullable=False)
    categoryId = db.Column(db.Integer, unique=True, nullable=False)

class Category(db.Model):
    categoryId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.VARCHAR(64))

class ShoppingSession(db.Model):
    ssid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer, unique=True)
    created_at = db.Column(db.DateTime())

class Cart(db.Model):
    cartId = db.Column(db.Integer, primary_key=True, nullable=False)
    ssid = db.Column(db.Integer, unique=True)
    prodid = db.Column(db.Integer)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime())

class OrderDetail(db.Model):
    __tablename__ = 'OrderDetail'
    orderDetailId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer)
    total = db.Column(db.Double)
    paymentId = db.Column(db.Integer)
    totalWeight = db.Column(db.Double)
    deliveryMethod = db.Column(db.Enum('Truch', 'Pickup', 'Drone'))
    status = db.Column(db.Enum('Completed', 'In Progress'), default='In Progress')
    created_at = db.Column(db.DateTime())

class OrderItem(db.Model):
    orderItemId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orderId = db.Column(db.Integer, unique=True)
    prodid = db.Column(db.Integer)

class PaymentDetail(db.Model):
    paymentId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Double)
    provider = db.Column(db.VARCHAR(64))

class OrderAddr(db.Model):
    __tablename__ = 'orderAddr'
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(64))
    state = db.Column(db.VARCHAR(64))
    zipcode = db.Column(db.Integer)
    orderDetailId = db.Column(db.Integer)

class Driver(db.Model):
    __tablename__ = 'Driver'
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    status = db.Column(db.Enum('Ready', 'In Progress'), default='Ready')
    warehouse = db.Column(db.VARCHAR(64))
    orderDetailId = db.Column(db.Integer)
