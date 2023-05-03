import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES } from "./util";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const cookie = parseCookie(document.cookie);
  if (!cookie) {
    navigate("/login");
  }

  const firstname = cookie.UserFirstName;
  const lastname = cookie.UserLastName;
  const email = cookie.UserEmail;
  const address = cookie.UserAddress;
  const isAdmin = cookie.isAdmin;

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the form data, e.g. send it to a server
    console.log({ lastName, firstName, email, address });
  };

  return (
    <>
      <div>Welcome, {firstname}</div>

      <div className="my-4">
        <h1 className="text-center">Profile</h1>
      </div>

      <form className="flex flex-col items-center ">
        <div className="form-control my-4">
          <label className="input-group">
            <span>Last Name</span>
            <input
              type="text"
              placeholder={lastname}
              className="input input-bordered"
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
              className="input input-bordered"
            />
          </label>
        </div>
        <div className="my-4">
          <button className="btn btn-primary mx-4">Edit</button>
          <button className="btn btn-accent mx-4">Save</button>
        </div>
      </form>
    </>
  );
};

export default Profile;
