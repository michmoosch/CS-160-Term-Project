import { useEffect, useState } from "react";
import {
  ExtraActionsWrapper,
  Product,
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductFavButton,
  ProductImage,
  ProductMetaWrapper,
} from "../../Styles/Products";
import { Stack, Tooltip, Typography } from "@mui/material";
import FitScreenIcon from "@mui/icons-material/FitScreen";
import useDialogModal from "../../hooks/useDialogModal";
import ProductDetail from "../productdetail";
import ProductMeta from "./ProductMeta";
import useCart from "../../hooks/useCart";

export default function SingleProductDesktop({ product, matches }) {
  const [showOptions, setShowOptions] = useState(false);
  const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
    useDialogModal(ProductDetail);

  const { addToCart, addToCartText } = useCart(product);

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
        {showOptions && (
          <ProductAddToCart
            onClick={addToCart}
            show={showOptions}
            variant="contained"
          >
            {addToCartText}
          </ProductAddToCart>
        )}
        <ProductActionsWrapper show={showOptions || matches}>
          <Stack direction={matches ? "row" : "column"}>
            <ProductActionButton onClick={() => showProductDetailDialog()}>
              {/* might need to add this prop to the component below: title="Full view" */}
              <Tooltip placement="left">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
      </Product>
      <ProductMeta product={product} />
      <ProductDetailDialog product={product} />
    </>
  );
}
