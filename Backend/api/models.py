from flask_sqlalchemy import SQLAlchemy, ForeignKey



db = SQLAlchemy()


class User(db.Model):
    email = db.Column(db.VARCHAR(64), primary_key=True, nullable=False)
    pwd = db.Column(db.VARCHAR(128))
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    orderId = db.relationship("Order", uselist=False, backref="order_fk")
    

class Product(db.Model):
    prodid = db.Column(db.Integer, primary_key=True)
    prodName = db.Column(db.VARCHAR(64), unique=True, nullable=False)
    prodDescip = db.Column(db.TEXT, nullable=False)
    prodUnitPrice = db.Column(db.DOUBLE, nullable=False)
    prodUnitInStock = db.Column(db.Integer, nullable=False)
    prodUnitWeight = db.Column(db.DOUBLE, nullable=False)


class Cart(db.Model):
    cartid = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.Integer, ForeignKey(User.email), unique=True)
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(16))
    state = db.Column(db.VARCHAR(16))
    zipcode = db.Column(db.Integer)

class CartItem(db.Model):
    __tablename__ = 'cartitem'
    cartItemid = db.Column(db.INT, primary_key=True, nullable=False)
    productId = db.Column(db.Integer, ForeignKey(Product.prodId))
    cartId = db.Column(db.Integer, ForeignKey(Cart.cartId))
    quantity = db.Column(db.INT)

class userAddress(db.Model):
    __tablename__ = 'address'
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    street = db.Column(db.TEXT)
    city = db.Column(db.VARCHAR(64))
    state = db.Column(db.VARCHAR(64))
    zipcode = db.Column(db.Integer)

class driver(db.Model):
    __tablename__ = 'driver'
    driverid = db.Column(db.Integer, primary_key=True, nullable=False)
    fname = db.Column(db.VARCHAR(64))
    lname = db.Column(db.VARCHAR(64))
    status = db.Column(db.VARCHAR(20))
    warehouse = db.Column(db.VARCHAR(20))
    orderNum = db.Column(db.Integer)

class Order(db.Model):
    orderid = db.Column(db.INT, primary_key=True, nullable=False)
    orderDate = db.Column(db.TEXT)
    orderDeliveryMethod = db.Column(db.VARCHAR(64))
    uid = db.Column(db.Integer, ForeignKey(User.email), unique=True)

# class ShoppingSession(db.Model):
#     cartID = db.Column(db.INT, primary_key=True, nullable=False)
#     cartUserID = db.relationship('User', backref='cartsession', lazy=True)
#     cartTotal = db.Column(db.DOUBLE)
