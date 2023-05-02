CREATE DATABASE IF NOT EXISTS osd_db;

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
    categoryId Integer,
    FOREIGN KEY(categoryId) REFERENCES Category(categoryId) ON DELETE CASCADE,
    CHECK (prodUnitPrice > 0),
    CHECK (prodUnitInStock > 0),
    CHECK (prodUnitWeight > 0)
);

CREATE TABLE OrderDetail(
    orderDetailId Integer AUTO_INCREMENT UNIQUE NOT NULL,
    uid Integer NOT NULL,
    deliveryMethod ENUM('Pickup', 'Truck', 'Drone') NOT NULL,
    status ENUM('Completed', 'Pending', 'In Progress') default 'Pending',
    created_at TIMESTAMP default NOW(),
    PRIMARY KEY(uid, orderDetailId),
    FOREIGN Key(uid) REFERENCES user(uid) ON DELETE CASCADE
);

CREATE TABLE Driver(
    driverId Integer AUTO_INCREMENT NOT NULL PRIMARY KEY, 
    fname VARCHAR(64), 
    lname VARCHAR(64), 
    status ENUM('Active', 'In Progress') default 'Active', 
    Address ENUM('Washington Sq, San Jose, CA 95192', '150 W San Carlos St, San Jose, CA 95113') default 'Washington Sq, San Jose, CA 95192', 
    orderDetailId Integer UNIQUE,
    FOREIGN KEY(orderDetailId) REFERENCES OrderDetail(orderDetailId) ON DELETE SET NULL
);



# POPULATE WITH DATABASE

# Admin user
INSERT INTO User(email, pwd, fname, lname, isAdmin, address)
VALUES ("admin@osd.com", 'pbkdf2:sha256:260000$07OGspAmld8GbKpj$a2f2d160755b8b728719064af5d14a57d3827c54a6c45a00fdb8c16feaf6531c', "Admin", "User", TRUE, "Washington Sq, San Jose, CA 95192");


INSERT INTO Category(name)
VALUES ('Furniture'), ('Stationary'), ('Art Supplies');
select * from Category;

INSERT INTO Driver(fname, lname, orderDetailId)
VALUES
('DRIVER1', 'L', NULL), 
('DRIVER2', 'L', NULL),
('DRIVER3', 'L', NULL),
('DRIVER4', 'L', NULL),
('DRIVER5', 'L', NULL),
('DRIVER6', 'L', NULL);
SELECT * FROM Driver;

INSERT INTO Product(prodName, prodDescip, prodUnitInStock, prodUnitPrice, prodUnitWeight, categoryId)
VALUES
('Super Backpack', 'I am Desciption', '10', '129.99', '30', '1'),
('File Folder, Letter Size', 'I am Desciption', '5', '12.99', '0.5', '2'),
('Energizer Industrial Alkaline Batteries', 'I am Desciption', '50', '9.99', '5', '1'),
('Color Pencil', 'I am Desciption', '200', '1.99', '2.0', '3');
SELECT * FROM Product;
