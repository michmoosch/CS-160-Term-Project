import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Colors } from "../theme";

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    padding: "25px 0px 25px 0px",
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 0px 20px 0px",
  overflow: "hidden",
  background: Colors.secondary,
}));

export const MessageText = styled(Typography)(({ theme }) => ({
   fontFamily: '"Roboto", "cursive"',
   fontWeight: 'bold',
   color: 'black',
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
  // color: Colors.white,
  fontSize: "1.5rem",
}));