import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES } from "./util";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([0]);

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
      const obj = JSON.parse(data);
      setProducts((prev) => obj);
    }

    getData();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1995 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value == "") {
      async function getData() {
        const res = await fetch("/api/products");
        const data = await res.json();
        const obj = JSON.parse(data);
        setProducts((prev) => obj);
      }
      getData();
    } else {
      setProducts((prev) => {
        return prev.filter((product) => {
          return product.ProductName.toLowerCase().includes(e.target.value);
        });
      });
    }
  };

  const categoryHandler = (e) => {
    const val = e.target.value;
    if (val == 0) {
      async function getData() {
        const res = await fetch("/api/products");
        const data = await res.json();
        const obj = JSON.parse(data);
        setProducts((prev) => obj);
      }
      getData();
    } else {
      setProducts((prev) => {
        return prev.filter((product) => {
          console.log(product.categoryId, val);
          return product.categoryId == val;
        });
      });
    }
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

      <div className="navbar bg-content w-screen flex flex-row items-center justify-center mr-5 pr-5">
        <div className="form-control w-[200px]">
          <label className="label"></label>
          <label className="w-full">
            <input
              type="text"
              placeholder="Search Here"
              className="input input-bordered"
              onChange={handleChange}
            />
          </label>
        </div>

        {CATEGORIES &&
          CATEGORIES.map((category, index) => {
            return (
              <button
                className="btn btn-outline ml-5 mt-4"
                key={index}
                value={index}
                onClick={categoryHandler}
              >
                {category}
              </button>
            );
          })}
      </div>
      {/* Main Content */}
      <div className="container w-screen grid grid-cols-2 gap-4 content">
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="card shadow-lg compact bg-base-100 w-[200px] h-[200px]"
              >
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
