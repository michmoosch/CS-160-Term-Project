import React, { useState } from "react";
import {
  Product,
  ProductActionsWrapper,
  ProductActionButton,
  ProductFavButton,
  ProductImage,
  ProductAddToCart,
} from "../../Styles/Products";
import { Stack, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ProductMeta from "./ProductMeta";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import useCart from "../../hooks/useCart";

function SingleProduct({ product, matches }) {
  const [
    ProductDetailDialog,
    showProductDetailDialog,
    closeProductDetailDialog,
  ] = useDialogModal(ProductDetail);

  const { addToCart, addToCartText } = useCart(product);

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  return (
    <>
      <Product onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <ProductImage src={product.image} />
        <ProductMeta product={product} matches={matches} />
        <ProductActionsWrapper>
          <Stack direction={matches ? "row" : "column"}>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              <Tooltip placement="left" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductAddToCart onClick={addToCart} variant="contained">
        {addToCartText}
      </ProductAddToCart>
      <ProductDetailDialog product={product} />
    </>
  );
}

export default SingleProduct;
