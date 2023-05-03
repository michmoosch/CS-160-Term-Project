CREATE TABLE IF NOT EXISTS `users` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `UserPsw` varchar(64) NOT NULL,
  `UserFirstName` varchar(64) NOT NULL,
  `UserLastName` varchar(64) NOT NULL,
  `UserEmail` text NOT NULL,
  `UserAddress` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `products` (
  `ProductId` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(64) NOT NULL,
  `ProductPrice` decimal(10,2) NOT NULL,
  `Quantity` int(11) NOT NULL DEFAULT 100,
  `ProductDescription` text NOT NULL,
  `ProductImage` text NOT NULL,
  `categoryId`  int(11) NOT NULL,
  PRIMARY KEY (`ProductId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;



INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Desk', 30.00, 'This is a desk', 'desk.jpg', 2);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Chair', 50.00, 'This is a chair', 'chair.jpg', 2);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Lamp', 15.00, 'This is a lamp', 'lamp.jpg', 2);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Pen', 2.00, 'This is a pen', 'pen.jpg', 1);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Paper', 10.00, 'This is paper', 'paper.jpg', 1);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Stapler', 8.00, 'This is a stapler', 'stapler.jpg', 1);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Tape', 6.00, 'This is a tape', 'tape.jpg', 1);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Trash Can', 13.00, 'This is a trash can', 'trashcan.jpg', 2);
INSERT INTO products(ProductName, ProductPrice, ProductDescription, ProductImage, categoryId) VALUES ('Office Whiteboard', 25.00, 'This is a whiteboard', 'whiteboard.jpg', 2);

-- Fill in a couple admin users
INSERT INTO users(UserPsw, UserFirstName, UserLastName, UserEmail, UserAddress, isAdmin) VALUES ('password', 'Michael', 'Moore', 'michael@admin.com', 'N/A', 1);
INSERT INTO users(UserPsw, UserFirstName, UserLastName, UserEmail, UserAddress, isAdmin) VALUES ('password', 'admin', 'admin', 'admin@gmail.com', 'N/A', 1);
INSERT INTO users(UserPsw, UserFirstName, UserLastName, UserEmail, UserAddress, isAdmin) VALUES ('password', 'jane', 'Doe', 'jane@gmail.com', '123 Main Street', 0);