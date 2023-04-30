import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { products, officeTools, electronics } from "../../data";
import SingleProduct from "./SingleProduct";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import SingleProductDesktop from "./SingleProductDesktop";

export default function Products() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const renderProducts = products.map((product) => (
    <Grid
      item
      key={product.id}
      xs={2}
      sm={4}
      md={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
    >
      {matches ? (
        <SingleProduct product={product} matches={matches} />
      ) : (
        <SingleProductDesktop product={product} matches={matches} />
      )}
    </Grid>
  ));

  const renderOfficeTools = officeTools.map((officeTool) => (
    <Grid
      item
      key={officeTool.id}
      xs={2}
      sm={4}
      md={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
    >
      {matches ? (
        <SingleProduct product={officeTool} matches={matches} />
      ) : (
        <SingleProductDesktop product={officeTool} matches={matches} />
      )}
    </Grid>
  ));

  const renderElectronics = electronics.map((electronic) => (
    <Grid
      item
      key={electronic.id}
      xs={2}
      sm={4}
      md={4}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
    >
      {matches ? (
        <SingleProduct product={electronic} matches={matches} />
      ) : (
        <SingleProductDesktop product={electronic} matches={matches} />
      )}
    </Grid>
  ));

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 2, backgroundColor: "#cfd0d1" }}
      >
        Furnitures
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderProducts}
      </Grid>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, backgroundColor: "#cfd0d1" }}>
        Office Tools
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderOfficeTools}
      </Grid>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, backgroundColor: "#cfd0d1" }}>
        Electronics
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderElectronics}
      </Grid>
    </Container>
  );
}
