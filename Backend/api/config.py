import os
from dotenv import load_dotenv
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    STRIPE_PUBLISHABLE_API_KEY = os.getenv("STRIPE_PUBLISHABLE_API_KEY")
    STRIPE_SECRET_API_KEY = os.getenv("STRIPE_SECRET_API_KEY")
    CORS_HEADERS = "Content-Type"