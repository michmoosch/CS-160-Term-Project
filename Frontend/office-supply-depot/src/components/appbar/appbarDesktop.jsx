import React from "react";
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  AppbarContainer,
  AppbarHeader,
  MyList,
} from "../../Styles/appbar";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";
import { Link } from "react-router-dom";

const pages = ["Categories", "Contact Us", "About US"];

function AppbarDesktop({ matches }) {
  const { setShowSearchBox } = useUIContext();

  return (
    <AppbarContainer>
      <Link to="/home">
        <AppbarHeader src="/images/logo/logo.png" />
      </Link>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            // onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              mx: 1,
              p: 1,
              color: "white",
              backgroundColor: "black",
              display: "block",
              fontWeight: "bold",
              fontSize: "0.9rem",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
          >
            {page}
          </Button>
        ))}
      </Box>

      {/* <MyList type="row">
        <ListItemText primary="Categories" />
        <ListItemText primary="Contact Us" />
        <ListItemText primary="About Us" />
        <ListItemButton>
          <ListItemIcon>
            <SearchIcon onClick={() => setShowSearchBox(true)} />
          </ListItemIcon>
        </ListItemButton>
      </MyList> */}
      <Actions matches={matches} />
    </AppbarContainer>
  );
}

export default AppbarDesktop;
