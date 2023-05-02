import React from "react";
import "../../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Login = () => {



  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const fname = e.target.fname.value;
  //   const lname = e.target.lname.value;
  //   const email = e.target.email.value;
  //   const password = e.target.password.value;
  //   const data = JSON.parse(
  //     `{"email" : "${email}", "firName" : "${fname}", "lstName" : "${lname}", "userPsw" : "${password}" }`
  //   );

  //   const url = "http://127.0.0.1:5000/register";
  //   const customHeader = {
  //     headers: {
  //       // Authorization: `Bearer ${getLocalStorageToken()}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   return axios
  //     .post(url, data, customHeader)
  //     .then((res) => {
  //       if (res.status == 200) {
  //         console.log("Success!");
  //         document.cookie = `user=${fname + " " + lname};`;
  //         navigate("/home");
  //       }
  //     })
  //     .catch((err) => {
  //       return {
  //         status: err.response ? err.response.status : 0,
  //         data: {},
  //         error: err.message,
  //       };
  //     });
  // }
  return (
    <div>
      {/* <h1 className='login-title'>Welcome to Office Supply Depot</h1>
      <img src='/images/logo/logo.png' className="logo-image" /> */}
      <form className="login-container">
        <h1>Login</h1>
        <input type="text" className="input-field" placeholder="Email" />
        <input type="password" className="input-field" placeholder="Password" />
        <a href="/src/pages/signup/Signup.jsx" className="forgot-password"> 
          Forgot Password / Username?
        </a>
        <Link to="/home">
          <input type="submit" value="Login" className="submit-input" />
        </Link>
        <p className="is-registered">
          Don't Have An Account ?{" "}
          <Link className="sign-up-link" to="/signup">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
