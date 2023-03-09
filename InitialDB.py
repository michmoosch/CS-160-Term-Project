import sql


host = '127.0.0.1'  # Default
user = 'root'       # Local Username
psw = '5Th722A7'    # Local Password
database = 'CS160Project'

db = sql.connectServer(host, user, psw, database)
sql.showDB(db, 'SHOW TABLES')

# -----------------------------------------------------------------------------
# INITIALIZE TABLES IN DATABASE (RUN ONLY ONCE)

# sql.modifyDB(db, 'DROP TABLE User')

# sql.modifyDB(db, f'''CREATE TABLE User(
#                                         UserID varchar(64) NOT NULL PRIMARY KEY,
#                                         UserPsw varchar(64) NOT NULL,
#                                         UserFirstName varchar(64) NOT NULL,
#                                         UserLastName varchar(64) NOT NULL,
#                                         UserEmail text NOT NULL
#                                          )''')
#
# sql.modifyDB(db, f'''INSERT INTO User(UserID, UserPsw, UserFirstName, UserLastName, UserEmail)
#                         VALUES('admin','adminpsw','Yanping','Li','yl@email.com')''')






