import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
