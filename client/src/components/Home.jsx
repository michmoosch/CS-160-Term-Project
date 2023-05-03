import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

const parseCookie = (str) => {
  let flag = true;
  let str2 = "";
  try {
    str2 = str.split(";")[1].split("=")[1];
  } catch (e) {
    flag = false;
  }
  if (!flag) {
    return flag;
  }
  let data = {};
  try {
    data = JSON.parse(str2);
  } catch (e) {
    flag = false;
  }
  return flag ? data : flag;
};

const Home = () => {
  const navigate = useNavigate();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [products, setProducts] = useState([]);

  const cookie = parseCookie(document.cookie);
  if (!cookie) {
    navigate("/login");
  }

  const name = cookie.UserFirstName;
  const isAdmin = cookie.isAdmin;

  // Fetch products in useEffect
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/products");
      const data = await res.json();
      let list = [];
      for (const i in data) {
        list.push(data[i]);
      }

      setProducts((prev) => list);
    }

    getData();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-info-content">
        <div className="flex-1 indicator">
          Welcome, <p className="font-bold ml-1"> {name}</p>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <div className="indicator">
                {itemsInCart > 0 && (
                  <span className="indicator-item badge badge-secondary">
                    {itemsInCart}
                  </span>
                )}
                <button className="btn">My Cart</button>
              </div>
            </li>

            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
      {/* Main Content */}
      <div className="container grid grid-cols-3 gap-4">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <div className="card shadow-lg compact bg-base-100 w-[50px] h-[50px]">
                {product.ProductName}
              </div>
            );
          })}
      </div>
      {/* <Link className="btn" to="/">Log Out</Link>  */}
    </div>
  );
};

export default Home;
