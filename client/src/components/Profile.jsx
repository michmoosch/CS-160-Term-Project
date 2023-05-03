import React, { useState, useEffect } from "react";
import { parseCookie, CATEGORIES } from "./util";
import Signup from "./Signup";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const cookie = parseCookie(document.cookie);
  if (!cookie) {
    navigate("/login");
  }
  const name = cookie.UserFirstName;
  const isAdmin = cookie.isAdmin;
  return (
    <>
      <div>Welcome, {name}</div>
    </>
  );
};

export default Profile;
