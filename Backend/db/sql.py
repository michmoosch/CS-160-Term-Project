import mysql.connector
from mysql.connector import Error


def connectServer(host, user, password, database):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")
    return connection


def showDB(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        print(result)
    except Error as err:
        print(f"Error: '{err}'")


def modifyDB(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Database modified successfully")
    except Error as err:
        print(f"Error: '{err}'")


# Disconnect from DB
def disconnect(connection):
    try:
        connection.cursor().close()
        connection.close()
        print("MySQL database disconnect successful.\n")
    except Error as err:
        print(f"Error: '{err}'")
