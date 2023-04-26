import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminNav from "./Nav";
import Orders from "./Orders";
import Products from "./Products";

function AdminPage() {
  return (
    <>
      <AdminNav />
    </>
  );
}

export default AdminPage;
