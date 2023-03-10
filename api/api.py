from db import db
from werkzeug.security import generate_password_hash
from flask import Flask, request

api = Flask(__name__)


@api.route('/api/register', methods='POST')
def register():
    _username = request.json.get['username']
    _password = generate_password_hash(request.form['password'])
    _first_name = request.json.get['first_name']
    _last_name = request.json.get['last_name']
    _email = request.json.get['email']
    if request.method == 'POST':
        if db.getUser(_username) is not None:    # check if user already exists
            db.insertUser(_username, _password, _first_name, _last_name, _email)
            return {"msg": "User registered successfully"}  # TODO: tailor response to frontend
        else:
            return {"msg": "User already exists"}   # TODO: tailor response to frontend
