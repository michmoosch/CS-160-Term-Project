import React from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerTitle,
} from "../../Styles/banner";

function Banner() {
  const theme = useTheme();
  // if true: Screen is mobile size / false: desktop size
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BannerContainer>
      <BannerImage src="/images/banner/banner.jpg" />
      <BannerContent>
        <Typography variant="h5">Free Delivery</Typography>
        <BannerTitle variant="h3">Spend at least $100</BannerTitle>
        <BannerDescription variant="subtitle">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
          inventore sit, impedit molestiae neque atque sint sequi natus,
          aspernatur ex quod esse?
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
