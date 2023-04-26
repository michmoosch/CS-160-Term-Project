CREATE DATABASE IF NOT EXISTS osd_db;
USE osd_db;

CREATE TABLE User(
    uid INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
    pwd VARCHAR(128) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    isAdmin BOOLEAN DEFAULT 0,
    street TEXT,
    city VARCHAR(64),
    state VARCHAR(64),
    zipcode INTEGER
);

CREATE TABLE Category(
    categoryId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64)
);

CREATE TABLE Product(
    prodid INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prodName VARCHAR(64) UNIQUE NOT NULL,
    prodDescip TEXT NOT NULL,
    prodUnitPrice DOUBLE NOT NULL,
    prodUnitInStock INTEGER NOT NULL,
    prodUnitWeight DOUBLE NOT NULL,
    categoryId INTEGER,
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId)
);

CREATE TABLE ShoppingSession(
    ssid Integer NOT NULL PRIMARY KEY,
    uid Integer,
    created_at TIMESTAMP,
    modifted_at TIMESTAMP,
    FOREIGN KEY(uid) REFERENCES user(uid)
 );

CREATE TABLE Cart(
    cartId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ssid Integer,
    prodid Integer,
    quantity Integer,
    created_at TIMESTAMP,
    modifted_at TIMESTAMP,
    FOREIGN KEY(ssid) REFERENCES ShoppingSession(ssid),
    FOREIGN KEY(prodid) REFERENCES product(prodid)
);

CREATE TABLE paymentDetail(
    paymentId Integer AUTO_INCREMENT PRIMARY Key,
    amount Double,
    provider VARCHAR(64)
);

CREATE TABLE OrderDetail(
    orderDetailId Integer AUTO_INCREMENT PRIMARY KEY,
    uid Integer,
    total Double,
    paymentId Integer,
    totalWeight Double,
    deliveryMethod ENUM('Pickup', 'Truck', 'Drone'),
    status ENUM('Completed', 'In Progress'),
    created_at TIMESTAMP,
    FOREIGN Key(uid) REFERENCES user(uid),
    FOREIGN Key(paymentId) REFERENCES paymentDetail(paymentId)
);

CREATE TABLE Driver(
    driverId Integer AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    fname VARCHAR(64), 
    lname VARCHAR(64), 
    status ENUM('Ready', 'In Progress') default 'Ready', 
    warehouse VARCHAR(64), 
    orderDetailId Integer UNIQUE,
    FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId)
);

CREATE TABLE orderAddr(
    fname VARCHAR(64),
    lname VARCHAR(64), 
    street TEXT, 
    city VARCHAR(24), 
    state VARCHAR(24),
    zipcode Integer,
    orderDetailId Integer,
    FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId)
);

CREATE TABLE OrderItem(
    orderItemId Integer AUTO_INCREMENT PRIMARY KEY,
    orderDetailId Integer,
    prodid Integer,
    FOREIGN Key(orderDetailId) REFERENCES orderDetail(orderDetailId),
    FOREIGN Key(prodid) REFERENCES product(prodid)
);
