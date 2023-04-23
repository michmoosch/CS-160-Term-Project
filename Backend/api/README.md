
# OSD Api

## Installation and Running

1. Install python 3.10 and MySQL 8 on your system
2. When setting up MySQL, note down credentials for connecting to the server. Modify DB connection string in app.py accordingly.
3. Connect to MySQL. In MySQL Shell `\connect {user}:{password}@{host}:3306`
4. Create database. In MySQL Shell `\sql CREATE DATABASE IF NOT EXISTS testdb;`. Append the database to end of connection string in app.py ie. `mysql+pymysql://root:password@localhost/testdb`
3. Open terminal and navigate to api folder. On Windows Powershell or Linux Bash:
`cd /$PATH-TO-PROJECT/Backend/api`
4. Create virtual environment `python -m venv venv`
5. Run script to connect to virtual environment

On Windows: `venv\Scripts\activate`
On Mac `source venv\bin\activate`

5. Once connected to virtual environment, install requirements: `pip install -r requirements.txt`
6. To run flask server: `flask --app app run`

All fields and responses are in JSON format.
Parameters are URL parameters (ie. /api/products?query=name&page=1)

## Routes

### POST - /api/register

Creates user if given email is not already in use.

#### Fields

* email - user's email
* userPsw - user's password
* firName - user's first name
* lstName - user's last name

#### Response
* msg - A message indicating registration success

### POST - /api/login

Logs user in with given credentials

#### Fields

* email - user's email
* userPsw - user's password

#### Response

* msg - A message indicating login success

### GET - /api/users

Returns paginated list of users along with details about them. Default returns page 1 of all users sorted by last name ascending.

#### Parameters - all optional

* uid - user id number
* email - user's email address
* fname - user's first name
* lname - user's last name
* sort_by - product attribute to sort by and direction (ie. "fname+desc", "lname+asc")
* page - page number to return
* per_page - number of items per page

#### Response
* data - list of users with the following attributes:
    * uid - user id number
    * email - user's email address
    * fname - user's first name
    * lname - user's last name
* msg - A message indicating search success

### GET - /api/products

Returns paginated list of products along with details about them. Default returns page 1 of all products sorted by name ascending.

#### Parameters - all optional

* search - user's search bar input
* price_gt - lower limit for product price
* price_lt - upper limit for product price
* weight_gt - lower limit for product price
* weight_lt - upper limit for product price
* in_stock - input "True" to check for in-stock products only: omit parameter otherwise
* sort_by - product attribute to sort by and direction (ie. "name+desc", "price+asc")
* page - page number to return
* per_page - number of items per page

#### Response
* data - list of products with the following attributes:
    * prodid - product's ID number
    * prodName - product's name
    * prodDescip - product's description
    * prodUnitPrice - product's price
    * prodUnitInStock - number of this product in stock
    * prodUnitWeight - product's weight
* msg - A message indicating search success