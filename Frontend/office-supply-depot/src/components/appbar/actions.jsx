import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
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

function Actions({ matches }) {
  const { cart, setShowCart } = useUIContext();

  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Component>
      <MyList type="row">
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
        {/* <Divider orientation="vertical" flexItem /> */}
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
            <PersonIcon
              onClick={() => setIsOpen(true)}
              style={{ color: "white" }}
            />
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
              <Login />
              {/* <Signup /> */}
            </Modal>
          </ListItemIcon>
        </ListItemButton>
      </MyList>
    </Component>
  );
}

export default Actions;
