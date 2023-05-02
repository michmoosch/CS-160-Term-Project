CREATE DATABASE IF NOT EXISTS osd_db;

USE osd_db;

CREATE TABLE User(
    uid Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(64) NOT NULL UNIQUE,
    pwd VARCHAR(128) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    isAdmin Boolean default False,
    address TEXT
);

CREATE TABLE Category(
    categoryId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64)
);

CREATE TABLE Product(
    prodid Integer NOT NULL PRIMARY KEY,
    prodName VARCHAR(64) NOT NULL UNIQUE,
    prodDescip TEXT,
    prodUnitPrice DOUBLE NOT NULL,
    prodUnitInStock Integer NOT NULL,
    prodUnitWeight DOUBLE NOT NULL,
    categoryId Integer NOT NULL UNIQUE,
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId) ON DELETE CASCADE
);


CREATE TABLE OrderDetail(
    orderDetailId Integer UNIQUE,
    uid Integer,
    deliveryMethod ENUM('Pickup', 'Truck', 'Drone'),
    status ENUM('Completed', 'Pending', 'In Progress') default 'Pending',
    created_at TIMESTAMP,
    PRIMARY KEY(uid, orderDetailId),
    FOREIGN Key(uid) REFERENCES user(uid) ON DELETE CASCADE
);

CREATE TABLE Driver(
    driverId Integer AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    fname VARCHAR(64), 
    lname VARCHAR(64), 
    status ENUM('Active', 'In Progress') default 'Active', 
    Address TEXT, 
    orderDetailId Integer UNIQUE,
    FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId)
);

CREATE TABLE OrderItem(
    orderItemId Integer AUTO_INCREMENT UNIQUE PRIMARY KEY,
    orderDetailId Integer,
    prodid Integer,
    quantity Integer,
    FOREIGN Key(orderDetailId) REFERENCES OrderDetail(orderDetailId) ON DELETE CASCADE,
    FOREIGN Key(prodid) REFERENCES product(prodid) ON DELETE CASCADE
);


# POPULATE WITH DATABASE

# Admin user
INSERT INTO User(email, pwd, fname, lname, isAdmin, address)
VALUES ("admin@osd.com", 'pbkdf2:sha256:260000$07OGspAmld8GbKpj$a2f2d160755b8b728719064af5d14a57d3827c54a6c45a00fdb8c16feaf6531c', "Admin", "User", TRUE);