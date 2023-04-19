import { Box, Button, Drawer, useMediaQuery } from "@mui/material";
import { Colors } from "../../Styles/theme";
import React from "react";
import { useUIContext } from "../../context/ui";
import { useTheme } from "@material-ui/core";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

function Cart() {
  const { cart, showCart, setShowCart } = useUIContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

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
          {item.price}
        </Typography>
      </Box>
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
