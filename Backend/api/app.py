from models import User, Product, Cart, db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from sqlalchemy.orm.attributes import flag_modified


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost/testdb"

db.init_app(app)

app.config["JWT_SECRET_KEY"] = "k6x*Ak&Dt#UkjP&yib9aYxJR$R6cQy74"
jwt = JWTManager(app)


with app.app_context():
    db.create_all()


@app.route('/api/register', methods=['POST'])
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
            return {"msg": "User already exists"}, 400


@app.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pwd = data['userPsw']
        db_pwd = db.session.execute(db.select(User.pwd).where(User.email == email)).scalar()
        if db_pwd is not None:
            if check_password_hash(db_pwd, pwd):
                token = create_access_token(identity=email)
                return {"msg": "User successfully logged in", "access_token": token}
        return {"msg": "Incorrect email or password"}, 400
    

@app.route('/api/users', methods=['GET'])
@jwt_required
def users_list():
    if request.method == 'GET':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(not isAdmin):
            return {"msg": "Unauthorized to access"}, 401
        uid = request.args.get('uid')
        email = request.args.get('email')
        fname = request.args.get('fname')
        lname = request.args.get('lname')
        sort_by = request.args.get('sort_by')
        options = []
        if uid:
            options.append(User.uid == uid)
        if email:    
            options.append(User.email == email)
        if fname:    
            options.append(User.fname == fname)
        if lname:    
            options.append(User.lname == lname)
        sort_options = []
        if sort_by:
            sort = sort_by.split()
            match sort[0]:
                case "uid":
                    if sort[1] == "asc":
                        sort_options.append(User.uid.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(User.uid.desc())
                case "email":
                    if sort[1] == "asc":
                        sort_options.append(User.email.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(User.email.desc())
                case "fname":
                    if sort[1] == "asc":
                        sort_options.append(User.fname.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(User.fname.desc())
                case "lname":
                    if sort[1] == "asc":
                        sort_options.append(User.lname.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(User.lname.desc())
                case _:
                    sort_options.append(User.lname.asc())
        page = request.args.get('page')                                 # page number
        per_page = request.args.get('per_page')                         # items per page
        args = {}
        if page:
            args['page'] = int(page)
        if per_page:
            args['per_page'] = int(per_page)
        users_list = db.paginate(db.select(User)
                                    .where(db.and_(db.true(), *options))
                                    .order_by(*sort_options),
                                    **args)
        if users_list.items:
            return {
                        'data': [{
                            "uid": user.uid,
                            "email": user.email,
                            "fname": user.fname,
                            "lname": user.lname,
                        } for user in users_list],
                        'msg': 'Found %d results' % users_list.total
                    }
        else:
            return {'data': [], "msg": "No results for given query"}, 404
        

@app.route('/api/users/<uid>', methods=['GET', 'PUT'])
def user_details(uid):
    if request.method == 'GET':
        user = db.session.execute(db.select(User)
                                    .where(User.uid == uid)).scalar_one()
        if user is not None:
            return {
                        'data': [{
                            "uid": user.uid,
                            "email": user.email,
                            "fname": user.fname,
                            "lname": user.lname,
                        }],
                        'msg': 'Found user'
                    }
        else:
            return {'data': [], "msg": "User doesn't exist"}, 404
    if request.method == 'PUT':
        user = db.session.execute(db.select(User)
                                    .where(User.uid == uid)).scalar_one()
        if user is not None:
            data = request.get_json()
            email = data['email']
            password = generate_password_hash(data['userPsw'])
            fname = data['firName']
            lname = data['lstName']
            if email:    
                User.email = email
            if password:    # TODO: verify pwd change by inputting old pwd
                User.pwd = password
            if fname:    
                User.fname = fname
            if lname:    
                User.lname = lname
            db.session.commit()
            return {"msg": "User successfully updated"}
        else:
            return {"msg": "User doesn't exist"}, 404


# Addprod page post request ERROR 
# category = {'1': 'Paper Product', 
#             '2': 'Art Supplies',
#             '3': 'Computer/Print Supplies',
#             '4': 'Desk Supplies',
#             '5': 'Stationary'}
@app.route('/Addprod', methods=['POST'])     # ADD PRODUCT PAGE
@jwt_required
def addProd():
    if request.method == 'POST':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(not isAdmin):
            return {"msg": "Unauthorized to access"}, 401
        data = request.get_json()
        prodid = data['id']
        prodName = data['name']
        prodDescip = data['description']
        prodUnitPrice = data['unitPrice']
        prodUnitInStock = data['unitInStock']
        prodUnitWeight = data['unitWeight']
        if db.session.execute(db.select(Product).where(Product.prodid == prodid)).scalar() is None:    # check if user already exists
            product = Product(prodid=prodid, prodName=prodName, prodDescip=prodDescip, prodUnitPrice=prodUnitPrice, prodUnitInStock=prodUnitInStock, prodUnitWeight=prodUnitWeight)
            db.session.add(product)
            db.session.commit()
            return {"msg": "Product added successfully"}
        else:
            return {"msg": "Product already exists"}
        
# TODO : Frontend not connected
@app.route('/xxx', methods=['POST'])
@jwt_required
def updateproduct():
    if request.method == 'POST':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(not isAdmin):
            return {"msg": "Unauthorized to access"}, 401
        newData = request.get_json()
        id = newData['id']
        name = newData['name']
        des = newData['descrip']
        price = newData['unitPrice']
        inStock = newData['unitInStock']
        weight = newData['unitWeight']
        if db.session.execute(db.select(Product).where(Product.prodId == id)).scalar() is not None:    # check if product exists
            instance = Product.query().filter(Product.prodId==id)
            data = instance.data
            data["prodName"] = name
            data["prodDescip"] = des
            data["prodUnitPrice"] = price
            data["prodUnitInStock"] = inStock
            data["prodUnitWeight"] = weight
            instance.data = data
            flag_modified(instance, "data")     # Work without this line?
            db.session.merge(instance)
            db.session.flush()
            db.session.commit()
            return {"msg": "Product updated successfully."}
        else:
            return {"msg": "Unable to find the product with given product ID."}


# Delete an item from database
@app.route('/xxx', methods=['POST'])
@jwt_required
def delproduct():
    if request.method == 'POST':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(not isAdmin):
            return {"msg": "Unauthorized to access"}, 401
        newData = request.get_json()
        id = newData['id']
        if db.session.execute(db.select(Product).where(Product.prodid==id)).scalar() is not None:
            Product.query.filter(Product.prodId == id).delete()
            db.session.commit()
            return {"msg": "Product has been deleted"}
        else:
            return {"msg": "No item has found"}

# Input prod ID
@app.route('/xxx', methods=['POST'])
def addCartItem():
    if request.method == 'POST':
        data = request.get_json()
        ssid = data['sessionId']
        prodid = data['id']
        quantity = data['quantity']
        try:
            cart = Cart(ssid=ssid, prodid=prodid, quantity=quantity, created_at=datetime.now())
            db.session.add(cart)
            db.session.commit()
            return {"msg": "Item added to Cart"}
        except:
            return {"msg": "Product ID does not exists"}

@app.route('/xxx', methods=['POST'])
def delCartItem():
    if request.method == 'POST':
        data = request.get_json()
        if db.session.execute(db.select(Cart).where(Cart.prodid==id)).scalar() is not None:
            Cart.query.filter(Cart.prodid==id).delete()
            db.seesion.commit()
            return {'msg': "Product has been deleted from cart"}
        else:
            return {'msg': 'Error in delecting product'}

@app.route('/api/products', methods=['GET'])
def product_list():
    if request.method == 'GET':
        search = request.args.get('search')
        price_gt = request.args.get('price_gt')
        price_lt = request.args.get('price_lt')
        weight_gt = request.args.get('weight_gt')
        weight_lt = request.args.get('weight_lt')
        in_stock = request.args.get('in_stock')
        sort_by = request.args.get('sort_by')
        options = []
        if search:
            terms = search.split()
            for term in terms:
                options.append(db.or_(Product.prodName.like("%%%s%%" % term),      # search in name
                                      Product.prodDescip.like("%%%s%%" % term)))   # search in desc
        if price_gt:    
            options.append(Product.prodUnitPrice > price_gt)            # greater than price
        if price_lt:    
            options.append(Product.prodUnitPrice < price_lt)            # less than price
        if weight_gt:    
            options.append(Product.prodUnitWeight > weight_gt)          # greater than weight
        if weight_lt:    
            options.append(Product.prodUnitWeight < weight_lt)          # less than weight
        if in_stock == "True":
            options.append(Product.prodUnitInStock > 0)                 # check if in stock
        sort_options = []
        if sort_by:
            sort = sort_by.split()
            match sort[0]:
                case "name":
                    if sort[1] == "asc":
                        sort_options.append(Product.prodName.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(Product.prodName.desc())
                case "price":
                    if sort[1] == "asc":
                        sort_options.append(Product.prodUnitPrice.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(Product.prodUnitPrice.desc())
                case "weight":
                    if sort[1] == "asc":
                        sort_options.append(Product.prodUnitWeight.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(Product.prodUnitWeight.desc())
                case "stock":
                    if sort[1] == "asc":
                        sort_options.append(Product.prodUnitInStock.asc())
                    elif sort[1 == "desc"]:
                        sort_options.append(Product.prodUnitInStock.desc())
                case _:
                    sort_options.append(Product.prodName.asc())
        page = request.args.get('page')                                 # page number
        per_page = request.args.get('per_page')                         # items per page
        args = {}
        if page:
            args['page'] = int(page)
        if per_page:
            args['per_page'] = int(per_page)
        products_list = db.paginate(db.select(Product)
                                    .where(db.and_(db.true(), *options))
                                    .order_by(*sort_options),
                                    **args)
        if products_list.items:
            return {
                        'data': [{
                            "prodid": product.prodid,
                            "prodName": product.prodName,
                            "prodDescip": product.prodDescip,
                            "prodUnitPrice": product.prodUnitPrice,
                            "prodUnitInStock": product.prodUnitInStock,
                            "prodUnitWeight": product.prodUnitWeight
                        } for product in products_list],
                        'msg': 'Found %d results' % products_list.total
                    }
        else:
            return {'data': [], "msg": "No results for given query"}, 404


@app.route('/api/products/<prodid>', methods=['GET'])
def product_details(prodid):
    product = db.session.execute(db.select(Product)
                              .where(Product.prodid == prodid)).scalar_one()
    if product is not None:
        return {
                    'data': [{
                            "prodid": product.prodid,
                            "prodName": product.prodName,
                            "prodDescip": product.prodDescip,
                            "prodUnitPrice": product.prodUnitPrice,
                            "prodUnitInStock": product.prodUnitInStock,
                            "prodUnitWeight": product.prodUnitWeight
                    }],
                    'msg': 'Found product'
                }
    else:
        return {'data': [], "msg": "Product doesn't exist"}, 404
