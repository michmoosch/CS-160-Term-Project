import React from "react";
import {
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
  AppbarContainer,
  AppbarHeader,
  MyList,
  StyledInputBase,
  SearchIconWrapper,
  Search,
} from "../../Styles/appbar";
import {
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Box,
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";
import { Link } from "react-router-dom";
// import { Search } from "@material-ui/icons";
import styled from "@emotion/styled";
import { alpha } from "@material-ui/core";

const pages = ["Contact Us", "About US"];

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

      <Search sx={{ mr: 5 }}>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: "white" }} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      {/* <ListItemButton sx={{ color: "white" }}>
        <ListItemIcon sx={{ color: "white" }}>
          <SearchIcon onClick={() => setShowSearchBox(true)} />
        </ListItemIcon>
      </ListItemButton> */}
      {/* <MyList type="row">
        <ListItemText primary="Categories" />
        <ListItemText primary="Contact Us" />
        <ListItemText primary="About Us" />
        
      </MyList> */}
      <Actions matches={matches} />
    </AppbarContainer>
  );
}

export default AppbarDesktop;
