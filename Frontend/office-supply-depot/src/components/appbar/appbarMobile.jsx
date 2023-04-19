import { IconButton } from "@mui/material";
import React from "react";
import { AppbarContainer, AppbarHeader } from "../../Styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Actions from "./actions";
import { useUIContext } from "../../context/ui";

function AppbarMobile({ matches }) {
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  return (
    <AppbarContainer>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <AppbarHeader src="/images/logo/logo.png" />
      <IconButton onClick={() => setShowSearchBox(true)}>
        <SearchIcon sx={{ color: "white" }} />
      </IconButton>
      <Actions matches={matches} />
    </AppbarContainer>
  );
}

export default AppbarMobile;
