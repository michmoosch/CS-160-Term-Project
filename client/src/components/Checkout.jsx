import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES, imageImports } from "./util";
import Signup from "./Signup";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const { state } = useLocation();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  // const [totalWeight, setTotalWeight] = useState(0);
  // const [totalPrice, setTotalPrice] = useState(0);
  // console.log(state);
  // const { id, color } = state; // Read values passed on state

  const cookie = parseCookie(document.cookie);
  const navigate = useNavigate();
  const name = cookie.UserFirstName;
  const isAdmin = cookie.isAdmin;

  if (!cookie) {
    navigate("/login");
  }

  useEffect(() => {
    let prods = [];
    let quants = [];
    async function getData() {
      const res = await fetch("/api/products");
      const data = await res.json();
      const obj = JSON.parse(data);
      // console.log(obj);
      for (const product in obj) {
        // console.log(obj[product])
        if (obj[product].ProductId in state) {
          prods.push(obj[product]);
          quants.push(state[obj[product].ProductId]);
        }
      }
      setProducts((prev) => prods);
      setQuantities((prev) => quants);
    }
    getData();
  }, []);

  const decItem = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (quantities[e.target.value] > 0) {
      // quantities[products.indexOf(e.target.value)] -= 1;
      setQuantities((prev) => {
        let update = prev;
        update[e.target.value] -= 1;
        return update;
      });
    }
  };
  const incItem = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // quantities[products.indexOf(e.target.value)] += 1;
    setQuantities((prev) => {
      let update = prev;
      update[e.target.value] += 1;
      console.log(update);
      return update;
    });
  };

  const totalPrice = () => {
    let total = 0;
    for (const product in products) {
      total += products[product].ProductPrice * quantities[product];
    }
    return total;
  };
  const totalWeight = () => {
    let total = 0;
    for (const product in products) {
      total += products[product].weight * quantities[product];
    }
    return total;
  };

  const handleShipping = (e) => {
    e.preventDefault();
    const method = e.target.value;
    console.log(method);
    setShippingMethod((prev) => method);
    setShowCheckout((prev) => !prev);
  };

  const insertOrder = async () => {
    console.log(parseCookie(document.cookie).UserId);
    const res = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: parseCookie(document.cookie).UserId,
        OrderTotal: totalPrice() + getShippingCost(),
        ShippingMethod: shippingMethod,
        TotalPrice: totalPrice(),
        TotalWeight: totalWeight(),
        quantities: quantities,
        products: products,
      }),
    });
    const data = await res.json();
    insertCart(data.orderID);
    return data;
  };

  const insertCart = async (orderId) => {
    for (const product in products) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          OrderId: orderId,
          ProductId: products[product].ProductId,
          Quantity: quantities[product],
        }),
      });
      const data = await res.json();
      return data;
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const res = await insertOrder();
    console.log(res);
    // setShowSuccess(prev => !prev);
    navigate("/profile");
  };

  const getShippingCost = () => {
    if (shippingMethod == "truck") {
      return 25;
    } else return 0;
  };

  const home = () => {
    navigate("/home");
  };

  const logout = (e) => {
    e.preventDefault();
    document.cookie = "expires=Thu, 01 Jan 1995 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const profile = () => {
    navigate("/profile");
  };

  return (
    <>
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
        <button className="btn" onClick={home}>
          Home
        </button>
        <button className="btn" onClick={profile}>
          Profile
        </button>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    <div>
      <div>
        {showCheckout && (
          <div className="bg-slate-600 absolute top-1/2 right-1/2 w-[400px] h-[400px] flex flex-col items-center justify-center z-20">
            <div className="text-2xl">
              Total: ${totalPrice() + getShippingCost()}
            </div>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleCheckout}
            >
              <input
                type="numeric"
                placeholder="CC Number"
                required
                className="input mt-3 w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Exp. Date"
                required
                className="input  mt-3 w-full max-w-xs"
              />
              <input
                type="numeric"
                placeholder="CVV"
                required
                className="input w-full mt-3 max-w-xs"
              />
              {/* <button className="btn btn-primary" onClick={handleCheckout} > Submit</button> */}
              <button type="submit" className="btn btn-primary my-2">
                Submit
              </button>
            </form>
            <a
              className="btn btn-primary"
              href="Cust_Map.html?address_2=123"
              target="_blank"
            >
              {" "}
              Pick Up
            </a>
          </div>
        )}
        {showSuccess && (
          <div className="bg-slate-600 absolute top-1/2 right-1/2 w-[400px] h-[250px] flex flex-col items-center justify-center">
            SUCCCESS
          </div>
        )}
        <table className="table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Total Price</th>
              <th>Total Weight</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              let w = product.weight * quantities[products.indexOf(product)];
              let p =
                product.ProductPrice * quantities[products.indexOf(product)];
              return (
                <tr>
                  <td>{product.ProductName}</td>
                  <td>${product.ProductPrice}</td>
                  <td>
                    <div
                      key={quantities[products.indexOf(product)]}
                      className="flex flex-row"
                    >
                      {quantities[products.indexOf(product)]}
                    </div>
                  </td>
                  <td>{product.weight} lbs.</td>
                  <td>${p}</td>
                  <td>{w} lbs</td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>${totalPrice()}</td>
              <td>{totalWeight()} lbs</td>
            </tr>
            <tr>
              <td>Shipping Methods</td>
              <td>
                <div className="btn-group btn-group-vertical lg:btn-group-horizontal flex flex-row w-full">
                  {totalPrice() >= 100 && (
                    <button
                      value="free"
                      onClick={(e) => {
                        handleShipping(e);
                      }}
                      className={`btn btn`}
                    >
                      Free shipping over $100
                    </button>
                  )}
                  {totalPrice() >= 100 && (
                    <button
                      value="truck"
                      onClick={(e) => {
                        handleShipping(e);
                      }}
                      className={`btn btn`}
                    >
                      $25 same day truck delivery
                    </button>
                  )}
                  {totalWeight() <= 15 && (
                    <button
                      value="drone"
                      onClick={(e) => {
                        handleShipping(e);
                      }}
                      className={`btn btn`}
                    >
                      Free Same day drone delivery
                    </button>
                  )}
                  {totalPrice() < 100 && (
                    <button
                      value="truck"
                      onClick={(e) => {
                        handleShipping(e);
                      }}
                      className={`btn btn`}
                    >
                      $25 2-day truck delivery
                    </button>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Checkout;

// return (<div>
//     <div>{product.ProductName}</div>
// <div>{quantities[products.indexOf(product)]}</div>
// </div>)
