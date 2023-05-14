import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES, imageImports } from "./util";
import { getProducts } from "./api";
import Signup from "./Signup";

import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [itemsInCart, setItemsInCart] = useState(0);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([0]);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const cookie = parseCookie(document.cookie);
  const name = cookie.UserFirstName;
  const isAdmin = cookie.isAdmin;
  if (!cookie) {
    navigate("/login");
  }

  const getImage = (imageName) => {
    for (const image in images) {
      if (image.includes(imageName)) {
        return images[image];
      }
    }
  };

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
    document.cookie = "expires=Thu, 01 Jan 1995 00:00:00 UTC; path=/;";
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
      async function getData() {
        const res = await fetch("/api/products");
        const data = await res.json();
        const obj = JSON.parse(data);
        setProducts((prev) => {
          return prev.filter((product) => {
            // console.log(product.categoryId, val);
            return product.categoryId == val;
          });
        });
      }
      getData();
    }
  };

  const incItem = (item) => {
    if (item in cart) {
      setCart((prev) => {
        const update = prev;
        update[item] += 1;
        console.log(update);
        return update;
      });
    } else {
      setCart((prev) => {
        const update = prev;
        update[item] = 1;
        console.log(update);
        return update;
      });
    }
    setItemsInCart((prev) => {
      let update = prev + 1;
      return update;
    });
    console.log(itemsInCart);
  };
  const decItem = (item) => {
    if (item in cart) {
      setCart((prev) => {
        const update = prev;
        if (update[item] == 0) {
          return;
        }
        update[item] -= 1;
        console.log(update);
        return update;
      });
    }
  };
  const addToCart = (e) => {
    // for (const product in products) {
    //   if (products[product].ProductId == e.target.value) {
    //     console.log(products[product].ProductName);
    //     incItem(products[product].ProductId);
    //   }
    // }\
    const index = e.target.value;
    console.log(products[index]);
    setCart({});
  };

  const checkout = () => {
    console.log(cart);
    navigate("/checkout", { state: cart });
  };

  const profile = () => {
    navigate("/profile");
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-info-content">
        <div className="flex-1 indicator">
          Welcome, <p className="font-bold ml-1"> {name}</p>
        </div>
        {isAdmin != 0 && (
          <a
            className="btn btn-primary mx-2"
            href="http://localhost:8000/?server=mysql_db"
          >
            Admin
          </a>
        )}
        {isAdmin != 0 && (
          <a className="btn btn-primary mx-2" href="Driver_Map.html">
            Driver Map
          </a>
        )}
        <button className="btn" onClick={profile}>
          Profile
        </button>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <div className="indicator">
                {itemsInCart > 0 && (
                  <span className="indicator-item badge badge-secondary">
                    {itemsInCart}
                  </span>
                )}

                <button
                  className="btn"
                  onClick={() => setShowCart((prev) => !prev)}
                >
                  My Cart
                </button>
              </div>
            </li>

            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
      {showCart && (
        <div className="fixed right-5 top-[12%] h-min-full-400 w-min-half-200 bg-primary z-20">
          {itemsInCart.length > 0 ? (
            itemsInCart.map((item) => {
              return (
                <div className="w-full flex flex-row justify-between bg-slate-200 text-xl">
                  <div>{item}</div>
                  <div className="w-1/4 flex flex-row justify-evenly">
                    <button
                      onClick={() => {
                        decItem(item);
                      }}
                    >
                      {" "}
                      -{" "}
                    </button>
                    {cart[item]}
                    <button
                      onClick={() => {
                        incItem(item);
                      }}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">Cart is Empty</div>
          )}
          <button
            className="btn btn-secondary absolute bottom-0"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      )}
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
      <div className="container w-screen grid grid-cols-3 gap-4 justify-center w-screen pl-[15%]">
        {products.length > 0 &&
          products.map((product, index) => {
            const img = imageImports[product.ProductImage];
            // console.log(product)
            return (
              <div
                key={index}
                className="card bg-base-200 w-[300px] h-[300px] p-5"
              >
                <figure>
                  <img src={img} alt={`${product.ProductName}`} />
                </figure>
                <h2 className="card-title">{product.ProductName}</h2>
                <p>{product.ProductDescription}</p>
                <span></span>
                <div className="card-actions justify-around items-center">
                  <button
                    className="btn btn-primary"
                    onClick={addToCart}
                    value={index}
                    disabled={product.Quantity == 0}
                  >
                    {product.Quantity == 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                  <span className="font-bold text-right">
                    Quantity: {product.Quantity}
                    <br />${product.ProductPrice}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
