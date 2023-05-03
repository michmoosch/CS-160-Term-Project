const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "mysql_db",
  user: "MYSQL_USER",
  password: "MYSQL_PASSWORD",
  database: "CS160Project",
});

app.get("/", async (req, res) => {
  res.json({ test: "passed" });
});

// TODO: Make email unique
app.post("/registerUser", async (req, res) => {
  const { email, firName, lstName, userPsw, address } = req.body;
  console.log(req.body);

  const insertQuery =
    "INSERT INTO users (UserId, UserPsw, UserFirstName, UserLastName, UserEmail, UserAddress) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    insertQuery,
    [0, userPsw, firName, lstName, email, address],
    (err, result) => {
      console.log(result);
      if (!result) {
        res.status(400).json({ message: "User already exists" });
      } else {
        res.status(200).json({ message: "User created" });
      }
    }
  );
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  // login sql query
  const loginQuery = `SELECT * FROM users WHERE UserEmail=? AND UserPsw=?`;
  db.query(loginQuery, [email, password], (err, result) => {
    // Check if user exists
    if (result && result.length > 0) {
      console.log(result)
      resBody = result[0];

      res.json(
        JSON.stringify({
          UserId: resBody.UserId,
          isAdmin: resBody.isAdmin,
          UserFirstName: resBody.UserFirstName,
        })
      );
    } else {
      res.status(400).json({ message: "User does not exist" });
// res.json(obj, status): Use res.status(status).json(obj) instead at index.js:64:11
    }
  });
});

app.get("/products", async (req, res) => {
  const productsQuery = `SELECT * FROM products`;
  db.query(productsQuery, (err, result) => {
    res.json(JSON.stringify(result));
  });
});

app.get("/products/:id", async (req, res) => {
  const id = req.query.id;
  console.log(id)
  const productsQuery = `SELECT * FROM products WHERE ProductId=?`;
  db.query(productsQuery, [id], (err, result) => {
    res.json(JSON.stringify(result));
  }
  );
});

app.post("/order", async (req, res) => {
  const {UserId, OrderTotal, ShippingMethod} = req.body;
  console.log(req.body);
  const insertQuery = 
    "INSERT INTO orders (UserId, OrderTotal, ShippingMethod) VALUES (?, ?, ?)";
  db.query(
    insertQuery,
    [UserId, OrderTotal, ShippingMethod],
    (err, result) => {
      console.log(result);
      if (!result) {
        res.json({ message: "User does exists." }, 400);
      } else {
        const id = result.insertId;
        res.json({ message: "Order created", orderID: id }, 200);
      }
    }
  );
});

app.post("/cart", async(req, res) => {
  const {OrderId, ProductId, Quantity} = req.body;
  console.log(req.body);
  const insertQuery = 
    "INSERT INTO cart (OrderId, ProductId, Quantity) VALUES (?, ?, ?)";
  db.query(
    insertQuery,
    [OrderId, ProductId, Quantity],
    (err, result) => {
      console.log(result);
      if (!result) {
        res.json({ message: "Order does exists." }, 400);
      } else {
        res.json({ message: "Cart created" }, 200);
      }
    }
  );
});
app.post("/orders", async (req, res) => {
  const {UserId} = req.body;
  const ordersQuery = `SELECT * FROM orders WHERE UserId = ${UserId}`;
  db.query(ordersQuery, (err, result) => {
    console.log(result)
    res.json(JSON.stringify(result));
  });
}
);

app.post("/profile", async (req, res) => {
  const {UserId, UserFirstName, UserLastName, UserEmail, UserAddress} = req.body;
  console.log(req.body);
  const updateQuery = `UPDATE users SET UserFirstName = ?, UserLastName = ?, UserEmail = ?, UserAddress = ? WHERE UserId = ${UserId}`
  db.query(
    updateQuery,
    [UserFirstName, UserLastName, UserEmail, UserAddress],
    (err, result) => {
      console.log(result);
      if (!result) {
        res.json({ message: "Invalid Input." }, 400);
      } else {
        res.json({ message: "Profile updated" }, 200);
      }
    }
  );
});
app.listen("3001", () => {});
