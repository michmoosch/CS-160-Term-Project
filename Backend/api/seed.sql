-- USE testdb;

-- insert into Category(name)
-- values("PAPER PRODUCTS"), ("ART SUPPLIES"), ("COMPUTER/PRINT SUPPLIES");

-- INSERT INTO product(prodName, prodDescip, prodUnitInStock, prodUnitPrice, prodUnitWeight, categoryId)
-- VALUES
-- ('Pencil', 'Writing utensil with a graphite lead embedded in a wooden shaft.', '150', '1.00', '16', '4'),
-- ('Eraser', 'Piece of rubber or other material used to rub out marks made by ink, pencil, or chalk.', '150', '0.50', '30','4'),
-- ('Pen', 'Tool used for writing or drawing with a colored fluid, such as ink.', '200', '1.50', '48', '4'),
-- ('Printer Paper', '8.5"x11", 100 sheets of white printing paper.', '100', '30', '90', '3'),
-- ('Letter Envelopes', 'Flast paper container 15.5 inches high x 5 inches long x 0.007 inch thick.', '50', '0.1', '6.75', '5'),
-- ('Composition Notebook', 'College Rule 9.75 x 7.5 100 page', '400', '1.99', '23', '1'),
-- ('Crayon', '24 Colored sticks of pigmented wax used for writing or drawing', '120', '0.99', '225', '2');

-- insert into ShoppingSession(ssid, uid, created_at)
-- VALUES ('1111111', '1', NOW()), ('54321', '102', CURDATE());
-- select * from ShoppingSession;

-- insert into Cart(ssid, prodid, quantity, created_at)
-- VALUES ('12345', '2', '5', NOW()), ('12345', '2', '1', NOW()), ('54321', '1', '2', NOW());
-- select * from Cart;


-- INSERT INTO driver(fname, lname, status, warehouse, orderDetailId)
-- VALUES
-- ('fname', 'lname', 'ready', 'warehouse1', '145'),
-- ('test', 'test', 'In progress', 'warehouse2', '155');

-- INSERT INTO orderAddr(fname, lname, street, city, state, zipcode, orderDetailId)
-- VALUES
-- ('a1', 'b1', '11 Main St.', 'San Jose', 'CA', '95116', '145'),
-- ('a2', 'b2', '100 Main St.', 'San Jose', 'CA', '95143', '155');


-- insert into paymentDetail(paymentId, amount, provider)
-- values('014375985', '20.5', 'VISA');

-- insert into OrderDetail(orderDetailId, uid, total, paymentId, totalWeight, deliveryMethod, status, created_at)
-- values('145', '1', '20.5', '014375985', '15', 'Truck', 'In Progress', NOW());

-- insert into OrderDetail(orderDetailId, uid, total, paymentId, totalWeight, deliveryMethod, status, created_at)
-- values('155', '102', '99.5', '014375985', '20', 'Truck', 'In Progress', NOW());

-- insert into OrderItem(orderId, prodid)
-- values ('155', '5'), ('155', '4'), ('155', '2');

-- insert into OrderItem(orderId, prodid)
-- values ('145', '3'), ('145', '1'), ('145', '2');

