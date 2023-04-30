import { Button, Typography } from "@mui/material";
import React from "react";
import { CheckCircle } from "@material-ui/icons";
import AppBar from "../../components/appbar";

function SuccessPay() {
  return (
    <>
      <AppBar />
      <Typography variant="h3">Thank you for your purchase!</Typography>
      <Typography variant="h4">Successful payment!</Typography>
      <CheckCircle style={{ color: "green", fontSize: 78 }} />
      <Button variant="contained">Track order</Button>
    </>
  );
}

export default SuccessPay;
