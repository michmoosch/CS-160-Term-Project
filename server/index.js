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
        res.json({ message: "User already exists" }, 400);
      } else {
        res.json({ message: "User created" }, 200);
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
    if (result.length > 0) {
      resBody = result[0];

      res.json(
        JSON.stringify({
          UserId: resBody.UserId,
          isAdmin: resBody.isAdmin,
          UserFirstName: resBody.UserFirstName,
        })
      );
    } else {
      res.json({ message: "User does not exist" }, 400);
    }
  });

  app.get("/products", async (req, res) => {
    const productsQuery = `SELECT * FROM products`;
    db.query(productsQuery, (err, result) => {
      res.json(JSON.stringify(result));
    });
  });

  // const insertQuery =
  //   "INSERT INTO users (UserId, UserPsw, UserFirstName, UserLastName, UserEmail) VALUES (?, ?, ?, ?, ?)";
  // db.query(
  //   insertQuery,
  //   [0, userPsw, firName, lstName, email],
  //   (err, result) => {
  //     res.json(JSON.stringify(result));
  //   }
  // );
});

app.listen("3001", () => {});
