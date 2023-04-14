CREATE TABLE userAddress(
    fname VARCHAR(64),
    lname VARCHAR(64), 
    street TEXT, 
    city VARCHAR(24), 
    state VARCHAR(24),
    zipcode Integer
);
CREATE TABLE driver(
    driverId Integer, 
    fname VARCHAR(64), 
    lname VARCHAR(64), 
    status VARCHAR(64), 
    warehouse VARCHAR(64), 
    orderId Integer
);


-- CREATE TABLE order(
--     orderId Integer PRIMARY KEY,
--     userId Integer
-- );


INSERT INTO testdb.driver(fname, lname, status, warehouse, orderNum)
VALUES
('fname', 'lname', 'ready', 'warehouse1', '123' ),
('test', 'test', 'In progress', 'warehouse2', '12');

INSERT INTO testdb.userAddress(fname, lname, street, city, state, zipcode)
VALUES
('a1', 'b1', '11 Main St.', 'San Jose', 'CA', '95116'),
('a2', 'b2', '100 Main St.', 'San Jose', 'CA', '95143');

SELECT * FROM testdb.driver;
SELECT * FROM testdb.userAddress;
