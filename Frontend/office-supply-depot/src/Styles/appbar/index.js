import { styled } from "@mui/material/styles";
import "@fontsource/montez";
import { Box } from "@mui/system";
import { IconButton, InputBase, List, Typography } from "@mui/material";
import { Colors } from '../theme'
import { position } from "polished";
import zIndex from "@mui/material/styles/zIndex";
import { textPopUpTop } from "../../animation";
import { alpha } from "@material-ui/core";

// Container
export const AppbarContainer = styled(Box)(() => ({    
    display: 'flex',
    marginTop: 4,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1px 8px'
}));

// export const BannerImage = styled("img")(({ src, theme }) => ({
//   src: `url(${src})`,
//   // backgroundImage: `url(${src})`,
//   // backgroundRepeat: "no-repeat",
//   // backgroundPosition: "center",
//   width: "500px",
//   objectFit: "contain",
//   [theme.breakpoints.down("md")]: {
//     width: "350px",
//   },
//   [theme.breakpoints.down("sm")]: {
//     width: "320px",
//     height: "300px",
//   },
// }));

export const AppbarHeader = styled("img")(({src, theme}) => ({
  src: `url(${src})`,
  width: "70px",
  objectFit: "contain",
  [theme.breakpoints.down("md")]: {
    width: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70px",
  },
  // padding: "4px",
  // flexGrow: 0,
  // color: Colors.secondary,
  // "&:hover": {
  //   animation: `${textPopUpTop} 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
  // },
}));
  

export const MyList = styled(List)(({ type }) => ({
display: type === "row" ? "flex" : "block",
flexGrow: 3,
  justifyContent: "center",
  alignItems: "center",
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
    display: 'flex',
    background: Colors.shaft,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,  
    borderTop: `1px solid ${Colors.border}`
  }));
  
  export const ActionIconsContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
  }));
  
  export const DrawerCloseButton= styled(IconButton)(() =>({
    position: 'absolute',
    top: 10,
    left: '250px',
    zIndex: 1999,

  }));

  export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));