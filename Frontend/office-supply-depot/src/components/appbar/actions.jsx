import {
  Button,
  Divider,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import {
  MyList,
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
} from "../../Styles/appbar";
import ShoppingCardIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { Colors } from "../../Styles/theme";
import LoginModal from "../../pages/login/Login";
import { useState } from "react";
import Modal from "../../pages/home/Modal";
import Login from "../../pages/login/Login";
import Signup from "../../pages/signup/Signup";
import Badge from "@mui/material/Badge";
import { useUIContext } from "../../context/ui";
import { Link } from "react-router-dom";

function Actions({ matches }) {
  const { cart, setShowCart } = useUIContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //let isLoggedIn = ...

  const settings = ["profile", "logout"];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logginComponent = isLoggedIn ? (
    <ListItemButton
      sx={{
        justifyContent: "center",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
      }}
      style={{ backgroundColor: Colors.secondary }}
    >
      <ListItemIcon
        sx={{
          display: "flex",
          justifyContent: "center",
          color: matches && Colors.secondary,
        }}
      >
        <PersonIcon style={{ color: "white" }} onClick={handleOpenUserMenu} />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
                <Link to={`/${setting}`} />
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </ListItemIcon>
    </ListItemButton>
  ) : (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Log In
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Login />
        {/* <Signup /> */}
      </Modal>
    </>
  );

  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;

  return (
    <Component>
      <MyList type="row">
        {isLoggedIn && (
          <ListItemButton
            onClick={() => setShowCart(true)}
            sx={{
              justifyContent: "center",
              width: "3em",
              height: "3em",
              borderRadius: "50%",
              m: 2,
            }}
            style={{ backgroundColor: Colors.secondary }}
          >
            <ListItemIcon
              sx={{
                display: "flex",
                justifyContent: "center",
                color: matches && Colors.secondary,
              }}
            >
              <Badge badgeContent={cart && cart.length} color="info">
                <ShoppingCardIcon style={{ color: "white" }} />
              </Badge>
            </ListItemIcon>
          </ListItemButton>
        )}
        {/* <Divider orientation="vertical" flexItem /> */}

        {logginComponent}
      </MyList>
    </Component>
  );
}

export default Actions;
