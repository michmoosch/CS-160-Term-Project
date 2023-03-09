from pymysql import Error
import sql

host = '127.0.0.1'          # Default
user = 'root'               # NEED TO CHANGE
psw = '5Th722A7'            # NEED TO CHANGE
database = 'CS160Project'   # NEED TO CHANGE
db = sql.connectServer(host, user, psw, database)

successCode = 200


def insertUser(userID, userPsw, firName, lstName, email):
    try:
        sql.modifyDB(db, f"""INSERT INTO User(UserID, UserPsw, UserFirstName, UserLastName, UserEmail)
                             VALUES('{userID}','{userPsw}','{firName}','{lstName}','{email}')""")
        return successCode
    except Error as err:
        print(f"Error: '{err}'")
    return '422'




