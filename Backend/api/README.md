
# OSD Api

## Installation and Running

1. Install python 3.10 on your system
2. Open terminal and navigate to api folder. On Windows Powershell or Linux Bash:
`cd /$PATH-TO-PROJECT/Backend/api`
3. Create virtual environment `python -m venv venv`
4. Run script to connect to virtual environment

On Windows: `venv\Scripts\activate`
On Mac `source venv\bin\activate`

5. Once connected to virtual environment, install requirements: `pip install -r Backend/requirements.txt`
5a. `pip install flask-cors`
6. To run flask server: `flask --app Backend\api\app run`

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