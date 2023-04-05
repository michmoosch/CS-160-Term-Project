import React from "react";
import Appbar from './../../components/appbar'
import ResponsiveAppBar from "../../components/appbar/ResponsisveAppBar";
import Banner from "../../components/banner";
import Promotions from "../../components/promotions";
import Products from "../../components/products";

const Home = () => {
  return (
    <div>
      <h1>Shop For Supply</h1>
      <Appbar/>
      <Banner/>
      <Promotions/>
      <Products/>

      {/* <ResponsiveAppBar/> */}
      {/* <h1 className="login-title">Successfully logged in {document.cookie}</h1>
      <NavBar/> */}
    </div>
  );
};

export default Home;
