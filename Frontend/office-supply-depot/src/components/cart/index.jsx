import {
  Box,
  ButtonGroup,
  Button,
  Drawer,
  useMediaQuery,
  MenuItem,
  Menu,
} from "@mui/material";
import { Colors } from "../../Styles/theme";
import React, { useState } from "react";
import { useUIContext } from "../../context/ui";
import { useTheme } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, showCart, setShowCart, setCart } = useUIContext();
  const [itemQuantity, setItemQuantity] = useState(1);
  const settings = ["dropoff", "pick "];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // //let isLoggedIn = ...

  const openMap = () => {
    window.open(
      "/CS-160-Term-Project/Frontend/office-supply-depot/src/pages/customerMap/index.html",
      "_blank"
    );
  };

  function decreaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (cart[itemIndex].quantity > 1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity -= 1;
      setCart(updatedCart);
    }
  }

  function increaseQuantity(itemId) {
    const itemIndex = cart.findIndex((item) => item.id === itemId);
    if (cart[itemIndex].quantity < 10) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      setCart(updatedCart);
    }
  }

  function getTotalWeight() {
    let totalWeight = 0;
    cart.forEach((item) => {
      totalWeight += item.weight * item.quantity;
    });
    return totalWeight.toFixed(2);
  }

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  const cartContent = cart.map((item) => (
    <Box key={item.id}>
      <Box
        display="flex"
        sx={{ pt: 2, pb: 2 }}
        alignItems="start"
        justifyContent={"space-between"}
      >
        <Avatar
          src={item.image}
          variant="square"
          sx={{ width: 100, height: "100%", mr: 2 }}
        />
        <Box display="flex" flexDirection={"column"}>
          <Typography variant="h6">{item.name}</Typography>
          {matches && (
            <Typography variant="subtitle2">{item.description}</Typography>
          )}
        </Box>
        <Typography variant="body1" justifyContent={"end"}>
          ${item.price}
        </Typography>
        <Typography variant="body1" justifyContent={"end"}>
          weight: {item.weight.toFixed(2)} lbs
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">Quantity: {item.quantity}</Typography>
        <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
        <Button onClick={() => increaseQuantity(item.id)}>+</Button>
      </Box>
      {/* cart = [{id: 1, name: "item1", price: 1, quantity: 1}, {id: 2, name: "item2", price: 2, quantity: 2}}] */}

      {!matches && (
        <Typography variant="subtitle2">{item.description}</Typography>
      )}
      <Divider variant="inset" />
    </Box>
  ));

  return (
    <Drawer
      open={showCart}
      onClose={() => setShowCart(false)}
      anchor="right"
      PaperProps={{
        sx: {
          width: matches ? "100%" : 500,
          background: "#123",
          borderRadius: 0,
        },
      }}
    >
      {cart.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" color={"grey"}>
            Shopping Cart
          </Typography>

          <Paper
            elevation={5}
            sx={{
              mt: 2,
              width: "95%",
              padding: 1,
            }}
          >
            {cartContent}
          </Paper>

          <Box>
            <Typography variant="h6">
              Total weight: {getTotalWeight()} lbs
            </Typography>
            <Typography variant="h6">
              Total: $
              {cart.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2)}
            </Typography>
          </Box>

          {getTotalWeight() < 15 && (
            // Allow the user to choose between a a drone delivery or a truck delivery

            // <button onClick={openMap}>Open Map</button>

            <Button variant="contained">
              {/* <td onClick={() => window.open("./index.html", "_blank")}>
                Pickup
              </td> */}
              <Link to="/map" target="_blank">
                Pickup
              </Link>
            </Button>
          )}

          <Button
            onClick={checkout}
            sx={{ mt: 4 }}
            variant="contained"
            color="success"
          >
            Checkout
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
          }}
          display="flex"
          justifyContent={"center"}
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant={matches ? "h5" : "h3"} color="white">
            Your cart is empty
          </Typography>
        </Box>
      )}

      <Button onClick={() => setShowCart(false)}>Close</Button>
    </Drawer>
  );
}

export default Cart;
