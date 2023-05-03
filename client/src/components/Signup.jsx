import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/logo.png";
import { registerUser } from "./api";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmpassword = e.target.confirmpassword.value;
    const address = e.target.address.value;

    if (password !== confirmpassword) {
      setError((prev) => "Passwords do not match");
      return;
    }

    const data = JSON.parse(
      `{"email" : "${email}", "firName" : "${fname}", "lstName" : "${lname}", "userPsw" : "${password}", "address" : "${address}" }`
    );
    console.log(data);
    const reply = await registerUser(data);
    console.log(reply);
    if (reply.message == "User created") {
      console.log("success");
      navigate("/login");
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center flex flex-col">
        <h1 className="signup-title">Create your Account</h1>
        <img src={icon} className="logo-image" />
        <form onSubmit={handleSubmit} className="login-container">
          {/* <h1>Sign Up</h1> */}
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>First Name</span>
              <input
                name="fname"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>Last Name</span>
              <input
                name="lname"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>Email</span>
              <input
                type="text"
                name="email"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>Address</span>
              <input
                name="address"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>Password</span>
              <input
                name="password"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-[200px]">
            <label className="label"></label>
            <label className="w-full">
              <span>Confirm Password</span>
              <input
                name="confirmpassword"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>

          <input
            className="mt-2"
            type="submit"
            value="create my account"
            className="btn"
          />
          <p className="register">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
        <div className="text-red">{error}</div>
      </div>
    </div>
  );
}

export default Signup;
