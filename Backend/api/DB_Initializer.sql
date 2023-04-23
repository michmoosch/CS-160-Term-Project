-- USE testdb;

-- CREATE TABLE ShoppingSession(
--     ssid Integer NOT NULL PRIMARY KEY,
--     uid Integer,
--     created_at TIMESTAMP,
--     modifted_at TIMESTAMP,
--     FOREIGN KEY(uid) REFERENCES user(uid)
-- );

-- CREATE TABLE Cart(
--     cartId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     ssid Integer,
--     prodid Integer,
--     quantity Integer,
--     created_at TIMESTAMP,
--     modifted_at TIMESTAMP,
--     FOREIGN KEY(ssid) REFERENCES ShoppingSession(ssid),
--     FOREIGN KEY(prodid) REFERENCES product(prodid)
-- );

-- CREATE TABLE Category(
--     categoryId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(64)
-- );

-- CREATE TABLE paymentDetail(
--     paymentId Integer AUTO_INCREMENT PRIMARY Key,
--     amount Double,
--     provider VARCHAR(64)
-- );

-- CREATE TABLE OrderDetail(
--     orderDetailId Integer AUTO_INCREMENT PRIMARY KEY,
--     uid Integer,
--     total Double,
--     paymentId Integer,
--     totalWeight Double,
--     deliveryMethod ENUM('Pickup', 'Truck', 'Drone'),
--     status ENUM('Completed', 'In Progress'),
--     created_at TIMESTAMP,
--     FOREIGN Key(uid) REFERENCES user(uid),
--     FOREIGN Key(paymentId) REFERENCES paymentDetail(paymentId)
-- );

-- CREATE TABLE Driver(
--     driverId Integer AUTO_INCREMENT NOT NULL PRIMARY KEY, 
--     fname VARCHAR(64), 
--     lname VARCHAR(64), 
--     status ENUM('Ready', 'In Progress') default 'Ready', 
--     warehouse VARCHAR(64), 
--     orderDetailId Integer UNIQUE,
--     FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId)
-- );

-- CREATE TABLE orderAddr(
--     fname VARCHAR(64),
--     lname VARCHAR(64), 
--     street TEXT, 
--     city VARCHAR(24), 
--     state VARCHAR(24),
--     zipcode Integer,
--     orderDetailId Integer,
--     FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId)
-- );

-- CREATE TABLE OrderItem(
--     orderItemId Integer AUTO_INCREMENT PRIMARY KEY,
--     orderDetailId Integer,
--     prodid Integer,
--     FOREIGN Key(orderDetailId) REFERENCES orderDetail(orderDetailId),
--     FOREIGN Key(prodid) REFERENCES product(prodid)
-- );
