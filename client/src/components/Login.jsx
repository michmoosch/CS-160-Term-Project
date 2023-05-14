import React, { useState } from "react";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      return;
    }

    const data = JSON.parse(
      `{"email" : "${email}", "password" : "${password}" }`
    );
    // fetch to backend
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();

          document.cookie = `token=${data}`;
          navigate("/home");
        } else {
          setError("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // console.log(data);
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center flex flex-col">
        <h1 className="text-4xl">Welcome to Office Suppy Depot</h1>
        <img src={icon} className="logo-image" />

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <label className="input-group">
              <span>Email</span>
              <input
                name="email"
                type="text"
                className="input input-bordered"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text"></span>
            </label>
            <label className="input-group">
              <span>Password</span>
              <input
                name="password"
                type="password"
                className="input input-bordered"
              />
            </label>
          </div>
          <button type="submit" className="btn mt-5 w-1/2">
            Submit
          </button>
        </form>
        <Link to="/signup">
          <a href="./Signup.js">Sign Up</a>
        </Link>

        {/* 

        <form onSubmit={handleSubmit} className="flex flex-col">
          <h1>Login</h1>
          <label>User Name</label>
          <input
            type="text"
            className="input-field"
            placeholder="Username or email"
            name="email"
          />
          <label>Password</label>
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            name="password"
          />
          <a href="" className="forgot-password">
            Forgot Password / Username?
          </a>
          <input type="submit" value="Login" className="login-submit" />
          <p className="register">
            Don't Have An Account ?{" "}
            <Link to="/signup">
              <a href="./Signup.js">Sign Up</a>
            </Link>
          </p>
        </form> */}
        <h2 style={{ color: "red" }}> {error}</h2>
      </div>
    </div>
  );
};

export default Login;
