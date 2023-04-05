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
                return {"msg": "User successfully logged in"}
        return {"msg": "Incorrect email or password"}, 400
    

@app.route('/api/users', methods=['GET'])
def users_list():
    if request.method == 'GET':
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
def profile(uid):
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



<<<<<<< HEAD

@app.route('/Addprod', methods=['POST'])     # ADD PRODUCT PAGE
def addProd():
    if request.method == 'POST':
        data = request.get_json()
        prodID = data['id']
        prodName = data['name']
        prodDescip = data['description']
        prodUnitPrice = data['unitPrice']
        prodUnitInStock = data['unitInStock']
        prodUnitWeight = data['unitWeight']
        if db.session.execute(db.select(Product).where(Product.prodID == prodID)).scalar() is None:    # check if user already exists
            product = Product(prodID=prodID, prodName=prodName, prodDescip=prodDescip, prodUnitPrice=prodUnitPrice, prodUnitInStock=prodUnitInStock, prodUnitWeight=prodUnitWeight)
            db.session.add(product)
            db.session.commit()
            return {"msg": "Product added successfully"}
        else:
            return {"msg": "Product already exists"}

=======
    
  
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
>>>>>>> ad2560f49248d135d8d9ef9515b0639fd1330d4c


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
