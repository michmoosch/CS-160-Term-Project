from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    uid = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(db.VARCHAR(64),unique=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128), nullable=False)
    fname = db.Column(db.VARCHAR(64), nullable=False)
    lname = db.Column(db.VARCHAR(64), nullable=False)
    isAdmin = db.Column(db.Boolean, server_default='FALSE')
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(64))
    state = db.Column(db.VARCHAR(64))
    zipcode = db.Column(db.Integer)

class Product(db.Model):
    __tablename__ = 'Product'
    prodid = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT, nullable=False)
    prodUnitPrice = db.Column(db.DOUBLE, nullable=False)
    prodUnitInStock = db.Column(db.Integer, nullable=False)
    prodUnitWeight = db.Column(db.DOUBLE, nullable=False)
    categoryId = db.Column(db.Integer, db.ForeignKey("Category.categoryId", ondelete="CASCADE"), unique=True, nullable=False)

class Category(db.Model):
    __tablename__ = "Category"
    categoryId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    name = db.Column(db.VARCHAR(64))

class ShoppingSession(db.Model):
    __tablename__ = 'ShoppingSession'
    ssid = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    uid = db.Column(db.Integer, db.ForeignKey("User.uid", ondelete="CASCADE"), unique=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    modified_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

class Cart(db.Model):
    __tablename__ = 'Cart'
    cartId = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    ssid = db.Column(db.Integer, db.ForeignKey("ShoppingSession.ssid", ondelete="CASCADE"), unique=True, nullable=False)
    prodid = db.Column(db.Integer, db.ForeignKey("Product.prodid", ondelete="CASCADE"), unique=True)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    modified_at = db.Column(db.DateTime(timezone=True), server_default=db.func.now())

class OrderDetail(db.Model):
    __tablename__ = 'OrderDetail'
    orderDetailId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.Integer, db.ForeignKey("User.uid", ondelete="CASCADE"))
    total = db.Column(db.Double)
    paymentId = db.Column(db.Integer, db.ForeignKey("PaymentDetail.paymentId", ondelete="CASCADE"))
    totalWeight = db.Column(db.Double)
    deliveryMethod = db.Column(db.Enum('Truck', 'Pickup', 'Drone'))
    status = db.Column(db.Enum('Completed', 'In Progress'), default='In Progress')
    created_at = db.Column(db.DateTime())

class OrderItem(db.Model):
    __tablename__ = 'OrderItem'
    orderItemId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    orderId = db.Column(db.Integer, db.ForeignKey("OrderDetail.orderDetailId", "CASCADE"), nullable=False)
    prodid = db.Column(db.Integer, db.ForeignKey("Product.prodid", ondelete="CASCADE"), unique=True, nullable=False)

class PaymentDetail(db.Model):
    __tablename__ = 'PaymentDetail'
    paymentId = db.Column(db.Integer, primary_key=True, autoincrement=True)
    amount = db.Column(db.Double)
    provider = db.Column(db.VARCHAR(64))

class OrderAddr(db.Model):
    __tablename__ = 'OrderAddr'
    addrID = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(24))
    state = db.Column(db.VARCHAR(24))
    zipcode = db.Column(db.Integer)
    orderDetailId = db.Column(db.Integer, db.ForeignKey(column="OrderDetail.orderDetailId", ondelete="CASCADE"), nullable=False)

class Driver(db.Model):
    __tablename__ = 'Driver'
    driverId =db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    status = db.Column(db.Enum('Ready', 'In Progress'), default='Ready')
    warehouse = db.Column(db.VARCHAR(64))
    orderDetailId = db.Column(db.Integer, db.ForeignKey("OrderDetail.orderDetailId", ondelete="CASCADE"), unique=True)
