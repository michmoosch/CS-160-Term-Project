import React from "react";
import "./login.css";
import Signup from "./Signup";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="login-title">Successfully logged in {document.cookie}</h1>
    </div>
  );
};

export default Home;
