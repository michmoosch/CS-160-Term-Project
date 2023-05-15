import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES } from "./util";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const cookie = parseCookie(document.cookie);
  const navigate = useNavigate();
  if (!cookie) {
    navigate("/login");
  }


  const [orders, setOrders] = useState([]);


  useEffect(() => {
    async function getData() {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "UserId": cookie.UserId
        }),
    });

    const data = await res.json();
    console.log(data)
      const obj = JSON.parse(data);
      console.log(obj);
      setOrders((prev) => obj);
    }
    getData();
  }, []);


  const firstname = cookie.UserFirstName;
  const lastname = cookie.UserLastName;
  const email = cookie.UserEmail;
  const address = cookie.UserAddress;
  const isAdmin = cookie.isAdmin;

  const editProfile = async (firstName, lastname, email, address) => {

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "UserId": cookie.UserId,
          "UserFirstName": firstname,
          "UserLastName": lastname,
          "UserEmail": email,
          "UserAddress": address,
      }),
  });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const address = event.target.address.value;
    const email = event.target.email.value;

    editProfile(firstName, lastName, email, address);

    navigate("/home")
    // do something with the form data, e.g. send it to a server
  };

  const home = () => {
    navigate("/home");
  };

  const logout = (e) => {
    e.preventDefault();
    document.cookie = "expires=Thu, 01 Jan 1995 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <>
    {/* Navbar */}
    <div className="navbar bg-info-content">
        <div className="flex-1 indicator">
          Welcome, <p className="font-bold ml-1"> {firstname}</p>
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
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>


      
      <div className="w-full text-center self-center text-4xl">Welcome, {firstname}</div>

     

      <form className="flex flex-col items-center " onSubmit={handleSubmit}>
        <div className="form-control my-4">
          <label className="input-group">
            <span>Last Name</span>
            <input
              type="text"
              placeholder={lastname}
              className="input input-bordered"
              name="lastName"
              // onChange={(event) => setLastName(event.target.value)}
            />
          </label>
        </div>

        <div className="form-control my-4">
          <label className="input-group">
            <span>First Name</span>
            <input
              type="text"
              placeholder={firstname}
              name="firstName"
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="form-control my-4">
          <label className="input-group">
            <span>Email</span>
            <input
              type="text"
              placeholder={email}
              name="email"
              className="input input-bordered"
            />
          </label>
        </div>

        <div className="form-control my-4">
          <label className="input-group">
            <span>Address</span>
            <input
              type="text"
              placeholder={address}
              name="address"
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="my-4">
          {/* <button className="btn btn-primary mx-4">Edit</button> */}
          <button type="submit" className="btn btn-accent mx-4">Save</button>
        </div>
      </form>

      <div className="overflow-x-auto">

  <table className="table w-full">
    <caption>Order History</caption>
    {/* head */}
    <thead>
      <tr>
        <th>Date</th>
        <th>Total</th>
        <th>Shipping method</th>
      </tr>
    </thead>
    <tbody>
    {orders.map((order) => (
     
      <tr>
        <td>{order.OrderDate}</td>
        <td>${order.OrderTotal}</td>
        <td>{order.ShippingMethod}</td>
      </tr>
    ))}
    </tbody>
  </table>
</div>

    </>
  );
};

export default Profile;
