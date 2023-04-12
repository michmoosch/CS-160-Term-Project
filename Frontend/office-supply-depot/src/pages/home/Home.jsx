import React from "react";
import Appbar from './../../components/appbar'
import ResponsiveAppBar from "../../components/appbar/ResponsisveAppBar";
import Banner from "../../components/banner";
import Promotions from "../../components/promotions";
import Products from "../../components/products";
import { Box, Typography } from "@mui/material";
import AppDrawer from "../../components/drawer";
import { UIProvider } from "../../context/ui";
import SearchBox from "../../components/search";

const Home = () => {
  return (
    <div>
      <h1>Shop For Supply</h1>
      <UIProvider>
        <Appbar/>
        <Banner/>
        <Promotions/>
        <Box display="flex" justifyContent={"center"} sx={{p:4}}>
          <Typography variant="h4">Our Products</Typography>
        </Box>
        <Products/>
        <AppDrawer/>
        <SearchBox/>
      </UIProvider>

      {/* <ResponsiveAppBar/> */}
      {/* <h1 className="login-title">Successfully logged in {document.cookie}</h1>
      <NavBar/> */}
    </div>
  );
};

export default Home;
