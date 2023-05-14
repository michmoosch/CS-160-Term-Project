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

    const reply = await registerUser(data);

    if (reply.message == "User created") {
      console.log("success");
      navigate("/login");
    } else if (reply.message == "User already exists") {
      setError((prev) => "User already exists");
    } else {
      setError((prev) => "Something went wrong");
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center flex flex-col">
        <h1 className="signup-title">Create your Account</h1>
        <img src={icon} className="logo-image" />
        <form
          onSubmit={handleSubmit}
          className="login-container w-min-full-300"
        >
          {/* <h1>Sign Up</h1> */}
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>First Name</span>
              <input
                name="fname"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>Last Name</span>
              <input
                name="lname"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>Address</span>
              <input
                name="address"
                type="text"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>Password</span>
              <input
                name="password"
                type="password"
                required
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="w-full  flex flex-col text-left">
              <span>Confirm Password</span>
              <input
                name="confirmpassword"
                type="password"
                required
                className="input input-bordered"
              />
            </label>
          </div>

          <input
            type="submit"
            value="create my account"
            className="btn my-5 w-ful"
          />
          <p className="register">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
        <div className="text-red-600">{error}</div>
      </div>
    </div>
  );
}

export default Signup;
