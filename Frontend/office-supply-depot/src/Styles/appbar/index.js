import { styled } from "@mui/material/styles";
import "@fontsource/montez";
import { Box } from "@mui/system";
import { List, Typography } from "@mui/material";
import { Colors } from '../theme'

// Container
export const AppbarContainer = styled(Box)(() => ({    
    display: 'flex',
    marginTop: 4,
    // backgroundColor: Colors.secondary,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2px 8px'
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
  width: "100px",
  objectFit: "contain",
  [theme.breakpoints.down("md")]: {
    width: "90px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70px",
  },
  // padding: "4px",
  // flexGrow: 0,
  // color: Colors.secondary
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
  