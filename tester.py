import db

UserID = 'test1'
UserPsw = 'test1psw'
UserFirstName = 'test1 first name'
UserLastName = 'test1 last name'
UserEmail = 'test1 email'

# Return code '200' if success
print(db.insertUser(UserID, UserPsw, UserFirstName, UserLastName, UserEmail))
