import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Checkout from "./components/Checkout";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./index.css";
import Profile from "./components/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  // strict mode causing double useState calls (ie. addToCart)
  //<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);
