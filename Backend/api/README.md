
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

6. Once connected to virtual environment, install requirements: `pip install -r Backend/requirements.txt`
7. To run flask server: `flask --app Backend\api\app run`

All fields and responses are in JSON format.

## Routes

### POST - /register

Creates user if given email is not already in use.

#### Fields

* email - user's email
* userPsw - user's password
* firName - user's first name
* lstName - user's last name

#### Response
* msg - A message indicating registration success

### POST - /login

Logs user in with given credentials

#### Fields

* email - user's email
* userPsw - user's password

#### Response

* msg - A message indicating login success