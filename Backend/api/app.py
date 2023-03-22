from models import User, db
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost/testdb"

db.init_app(app)


with app.app_context():
    db.create_all()


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pwd = generate_password_hash(data['userPsw'])
        fname = data['firName']
        lname = data['lstName']
        if db.session.execute(db.select(User).where(User.email == email)).scalar() is None:    # check if user already exists
            user = User(email=email, pwd=pwd, fname=fname, lname=lname)
            db.session.add(user)
            db.session.commit()
            return {"msg": "User registered successfully"}
        else:
            return {"msg": "User already exists"}


@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pwd = data['userPsw']
        db_pwd = db.session.execute(db.select(User.pwd).where(User.email == email)).scalar()
        if db_pwd is not None:
            if check_password_hash(db_pwd, pwd):
                return {"msg": "User successfully logged in"}
        return {"msg": "Incorrect email or password"}

    
  
# @app.route('IN PROGRESS', methods=['POST'])     # ADD PRODUCT PAGE
# def addProduct():
#     if request.method == 'POST':
#         data = request.get_json()
#         prodID = data['Product ID']
#         prodName = data['Product Name']
#         prodDescip = data['Product Description']
#         prodUnitPrice = data['Product Unit Price']
#         prodUnitInStock = data['Product Unit In Stock']
#         prodUnitWeight = data['Product Unit Weight']
#         if db.session.execute(db.select(Product).where(Product.prodID == prodID)).scalar() is None:    # check if user already exists
#             product = Product(prodID=prodID, prodName=prodName, prodDescip=prodDescip, prodUnitPrice=prodUnitPrice, prodUnitInStock=prodUnitInStock, prodUnitWeight=prodUnitWeight)
#             db.session.add(product)
#             db.session.commit()
#             return {"msg": "Product added successfully"}
#         else:
#             return {"msg": "Product already exists"}
