CREATE DATABASE osd_db;

USE osd_db;

CREATE TABLE User(
    uid Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(64) NOT NULL UNIQUE,
    pwd VARCHAR(64) NOT NULL,
    fname VARCHAR(64) NOT NULL,
    lname VARCHAR(64) NOT NULL,
    isAdmin boolean default FALSE,
    address TEXT NOT NULL
);

CREATE TABLE Category(
    categoryId Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64)
);

CREATE TABLE Product(
    prodid Integer NOT NULL AUTO_INCREMENT PRIMARY KEY,
    prodName VARCHAR(64) NOT NULL UNIQUE,
    prodDescip TEXT NOT NULL,
    prodUnitPrice DOUBLE NOT NULL,
    prodUnitInStock Integer NOT NULL,
    prodUnitWeight DOUBLE NOT NULL,
    prodStripeId VARCHAR(64) NOT NULL,
    prodImagePath VARCHAR(128),
    categoryId Integer,
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId) ON DELETE CASCADE,
    CHECK (prodUnitPrice > 0),
    CHECK (prodUnitInStock > 0),
    CHECK (prodUnitWeight > 0)
);

CREATE TABLE OrderDetail(
    orderDetailId Integer UNIQUE NOT NULL,
    uid Integer NOT NULL,
    created_at TIMESTAMP default NOW(),
    PRIMARY KEY(uid, orderDetailId),
    FOREIGN Key(uid) REFERENCES user(uid) ON DELETE CASCADE
);


# POPULATE WITH DATABASE 

# Admin user
INSERT INTO User(email, pwd, fname, lname, isAdmin, address)
VALUES ("admin@osd.com", 'pbkdf2:sha256:260000$07OGspAmld8GbKpj$a2f2d160755b8b728719064af5d14a57d3827c54a6c45a00fdb8c16feaf6531c', "Admin", "User", TRUE, "Washington Sq, San Jose, CA 95192");


INSERT INTO Category(name)
VALUES ('Furniture'), ('Stationary'), ('Art Supplies');


INSERT INTO Product(prodName, prodDescip, prodUnitInStock, prodUnitPrice, prodUnitWeight, prodStripeId, prodImagePath, categoryId)
VALUES
('Super Backpack', 'I am Desciption', '10', '129.99', '30', 'price_1N3jKQKqLmqC1u8HJDr4G4Qz', '${process.env.PUBLIC_URL}/images/products/Furnitures/black lamp.jpg', '1'),
('File Folder, Letter Size', 'I am Desciption', '5', '12.99', '0.5','price_1N3jQxKqLmqC1u8HGLrK0LGi', '${process.env.PUBLIC_URL}/images/products/Furnitures/black single chair.jpg', '2'),
('Energizer Industrial Alkaline Batteries', 'I am Desciption', '50', '9.99', '5', 'price_1N3jSEKqLmqC1u8HF7BpISM1', '${process.env.PUBLIC_URL}/images/products/Furnitures/clock.jpg', '1'),
('Color Pencil', 'I am Desciption', '200', '1.99', '2.0', 'price_1N3jT0KqLmqC1u8HJhjpMHJm', '${process.env.PUBLIC_URL}/images/products/Furnitures/hanging white lamp.jpg', '3');