
# OSD Api

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