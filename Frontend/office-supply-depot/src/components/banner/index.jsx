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
        <Typography variant="h5">
          Free Delivery Service for orders over $100
        </Typography>
        <BannerTitle variant="h3">Fast Drone delivery</BannerTitle>
        <BannerDescription variant="subtitle">
          Get what you need in within 30 minutes with our fast drone delivery
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  );
}

export default Banner;
