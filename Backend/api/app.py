from api.models import User, Product, Category, db
from api.config import Config
from datetime import datetime, timedelta
import stripe
from werkzeug.security import generate_password_hash, check_password_hash
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from sqlalchemy.orm.attributes import flag_modified
from flask_cors import cross_origin



route_bp = Blueprint("route_bp", __name__)
stripe.api_key = Config.STRIPE_SECRET_API_KEY


#@route_bp.errorhandler(404)
#def not_found(e):
#    return app.send_static_file('index.html')

# Register user (ie. create non-admin user)
@route_bp.route('/api/register', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def register():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pwd = generate_password_hash(data['userPsw'])
        fname = data['firName']
        lname = data['lstName']
        address = data['address']
        if db.session.execute(db.select(User).where(User.email == email)).scalar() is None:    # check if user already exists
            user = User(email=email, pwd=pwd, fname=fname, lname=lname, address=address)
            db.session.add(user)
            db.session.commit()
            return {"msg": "User registered successfully"}
        else:
            return {"msg": "User already exists"}, 400

# Login user
@route_bp.route('/api/login', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data['email']
        pwd = data['userPsw']
        user = db.session.execute(db.select(User).where(User.email == email)).scalar()
        if user is not None:
            if check_password_hash(user.pwd, pwd):
                access_token = create_access_token(identity=user.uid, fresh=True)
                refresh_token = create_refresh_token(identity=email)
                return {"data":[{"access_token": access_token,
                                 "refresh_token": refresh_token,
                                 "isAdmin": user.isAdmin,
                                 "token_expiration": datetime.now() + timedelta(hours=1),
                                 "uid": user.uid}],
                        "msg": "User successfully logged in"}
        return {"data": [], "msg": "Incorrect email or password"}, 400

# Refresh expiring access token    
@route_bp.route('/api/refresh', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    refresh_token = create_refresh_token(identity=identity)
    return {"access_token": access_token, "refresh_token": refresh_token}
    
# -------------------------------------------------------- #
# Profile Managements

# Retrieve list of users
@route_bp.route('/api/users', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
@jwt_required()
def users_list():
    if request.method == 'GET':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(isAdmin == "False"):
            return {"data": [], "msg": "Unauthorized to access"}, 401
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
        
# GET: Retrieve user details (ie. for profile page)
# PUT: Update user details
@route_bp.route('/api/users/<uid>', methods=['GET', 'PUT'])
@cross_origin(allow_headers=['Content-Type'])
@jwt_required()
def user_details(uid):
    identity = get_jwt_identity()
    db_identity = db.session.execute(db.select(User).where(User.email == identity)).scalar()
    if(db_identity.isAdmin == "True" or db_identity.uid == uid):
        return {"data": [], "msg": "Unauthorized to access"}, 401
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
                            "address": user.address,
                            "isAdmin": user.isAdmin
                        }],
                        'msg': 'Found user'
                    }
        else:
            return {'data': [], "msg": "User doesn't exist"}, 404
    if request.method == 'PUT':
        user = db.session.execute(db.select(User)
                                    .where(User.uid == uid)).scalar_one_or_none()
        if user is not None:
            data = request.get_json()
            email = data['email']
            password = generate_password_hash(data['userPsw'])
            fname = data['firName']
            lname = data['lstName']
            address = data['address']
            if email != "":    
                User.email = email
            if password != "":    # TODO: verify pwd change by inputting old pwd
                if user.pwd == password:
                    User.pwd = password
                else:
                    return {"data": [], "msg": "Incorrect password"}, 401
            if fname != "":    
                User.fname = fname
            if lname != "":    
                User.lname = lname
            if address != "":
                User.address = address
            db.session.commit()
            return {"data": [], "msg": "User successfully updated"}
        else:
            return {"data": [], "msg": "User doesn't exist"}, 404


# -------------------------------------------------------- #
# Product Management

# Addprod page post request ERROR 
# category = {'1': 'Paper Product', 
#             '2': 'Art Supplies',
#             '3': 'Computer/Print Supplies',
#             '4': 'Desk Supplies',
#             '5': 'Stationary'}
@route_bp.route('/api/products/add', methods=['POST'])     # ADD PRODUCT PAGE
@cross_origin(allow_headers=['Content-Type'])
@jwt_required()
def addProd():
    if request.method == 'POST':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(isAdmin == "False"):
            return {"msg": "Unauthorized to access"}, 401
        data = request.get_json()
        prodName = data['name']
        prodDescip = data['description']
        prodUnitPrice = data['unitPrice']
        prodUnitInStock = data['unitInStock']
        prodUnitWeight = data['unitWeight']
        categoryId = data['category']
        product = Product(prodName=prodName, prodDescip=prodDescip, prodUnitPrice=prodUnitPrice, prodUnitInStock=prodUnitInStock, prodUnitWeight=prodUnitWeight, categoryId=categoryId)
        db.session.add(product)
        db.session.commit()
        return {"msg": "Product added successfully"}

# @route_bp.route('/xxx', methods=['GET'])
# def display_prod():
    

# -------------------------------------------------------- #
# Order Functions

# Item list from strike?
# @route_bp.route('/xxx', method=['POST'])
# def order_item():
#     if request.method == 'POST':
#         return None


# @route_bp.route('/xxx', methods=['POST'])
# def new_order():
#     if request.method == 'POST':
#         data = request.get_json()
#         uid = data['uid']
#         total = data['total']
#         deliveryMethod = data['deliverMethod']
#         try:
#             order = OrderDetail(uid=uid, total=total, deliveryMethod=deliveryMethod)
#             db.session.add(order)
#             db.session.commit()
#             return {"msg": "Order Completed"}
#         except:
#             return {"msg": "Order Failed"}

# Product list + search + filter, good for products page, homepage, search
@route_bp.route('/api/products', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def product_list():
    if request.method == 'GET':
        search = request.args.get('search')
        price_gt = request.args.get('price_gt')
        price_lt = request.args.get('price_lt')
        weight_gt = request.args.get('weight_gt')
        weight_lt = request.args.get('weight_lt')
        in_stock = request.args.get('in_stock')
        sort_by = request.args.get('sort_by')
        cat = request.args.get('cat')
        options = []
        if search:
            terms = search.split()
            for term in terms:
                options.append(db.or_(Product.prodName.like("%%%s%%" % term),      # search in name
                                      Product.prodDescip.like("%%%s%%" % term)))   # search in desc
        if cat:
            options.append(Category.name == cat)
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
                                    .join(Product.categories)
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
                            "prodUnitWeight": product.prodUnitWeight,
                            "category": product.categories.name
                        } for product in products_list],
                        'msg': 'Found %d results' % products_list.total
                    }
        else:
            return {'data': [], "msg": "No results for given query"}, 404

# Retrieve product details (ie. for product page)
@route_bp.route('/api/products/<prodid>', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def product_details(prodid):
    if request.method == 'GET':
        product = db.session.execute(db.select(Product)
                                    .join(Product.categories)
                                .where(Product.prodid == prodid)).scalar_one()
        if product is not None:
            return {
                        'data': [{
                                "prodid": product.prodid,
                                "prodName": product.prodName,
                                "prodDescip": product.prodDescip,
                                "prodUnitPrice": product.prodUnitPrice,
                                "prodUnitInStock": product.prodUnitInStock,
                                "prodUnitWeight": product.prodUnitWeight,
                                "category": product.categories.name
                        }],
                        'msg': 'Found product'
                    }
        else:
            return {'data': [], "msg": "Product doesn't exist"}, 404
        

# PUT: Update product details
# DELETE: Delete product from database
@route_bp.route('/api/products/<prodid>', methods = ['PUT', 'DELETE'])
@cross_origin(allow_headers=['Content-Type'])
@jwt_required()
def modify_product(prodid):
    if request.method == 'DELETE':
        identity = get_jwt_identity()
        isAdmin = db.session.execute(db.select(User.isAdmin).where(User.email == identity)).scalar()
        if(isAdmin == "False"):
            return {"msg": "Unauthorized to access"}, 401
        newData = request.get_json()
        if db.session.execute(db.select(Product).where(Product.prodid==prodid)).scalar() is not None:
            Product.query.filter(Product.prodId == prodid).delete()
            db.session.commit()
            return {"msg": "Product has been deleted"}
        else:
            return {"msg": "No item has found"}
    if request.method == 'PUT':
        newData = request.get_json()
        name = newData['name']
        des = newData['descrip']
        price = newData['unitPrice']
        inStock = newData['unitInStock']
        weight = newData['unitWeight']
        if db.session.execute(db.select(Product).where(Product.prodId == prodid)).scalar() is not None:    # check if product exists
            instance = Product.query().filter(Product.prodId==prodid)
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

# Stripe order/checkout
@route_bp.route('/api/stripe_key', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def get_publishable_key():
    return {"stripe_key": Config.STRIPE_PUBLISHABLE_API_KEY}

@route_bp.route('/api/checkout', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def checkout():
    if request.method == "POST":
        data = request.get_json()
        items = data['cart']
        
        session = stripe.checkout.Session.create(
            line_items=[{"price": item.id, "quantity": 1} for item in items],
            mode="payment",
            success_url="http://localhost/success",
            cancel_url="http://localhost"
        )
        return {"data": [{"url": session.url, "sessionId": session["id"]}]}
        
