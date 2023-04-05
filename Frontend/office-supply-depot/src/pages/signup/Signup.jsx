import React from "react";
import "../../Styles/login.css";
import "../../Styles/signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios, { formToJSON } from "axios";

function Signup() {

  const navigate = useNavigate();

  function handleSubmit(e) {


    e.preventDefault();

    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = JSON.parse(`{"email" : "${email}", "firName" : "${fname}", "lstName" : "${lname}", "userPsw" : "${password}" }`)



        const url = "http://127.0.0.1:5000/register"
        const customHeader = {
          headers: {
            // Authorization: `Bearer ${getLocalStorageToken()}`,
            "Content-Type": 'application/json',
          },
        };
      
        return axios
    .post(url, data, customHeader)
    .then((res) => {
      if(res.status == 200) {
        console.log("Success!")
        document.cookie = `user=${fname + " " + lname};`;
        navigate("/home");
      }
    })
    .catch((err) => {
      return {
        status: err.response ? err.response.status : 0,
        data: {},
        error: err.message,
      };
    });
        

    
  }
  return (
    <div>
      <h1 className="signup-title">Create your Account</h1>
      {/* <img src={require("../images/logo.png")} className="logo-image" /> */}
      <form onSubmit={handleSubmit} className="login-container">
        <h1>Sign Up</h1>
        <input
          type="text"
          className="input-field"
          placeholder="Last Name"
          name="lname"
        />
        <input
          type="text"
          className="input-field"
          placeholder="First Name"
          name="fname"
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          name="password"
        />
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
        />
        <input
          type="submit"
          value="Create Account"
          className="submit-input"
        />
        <p className="is-registered">
          Already have an account?{" "}
          <Link className="login-link" to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
