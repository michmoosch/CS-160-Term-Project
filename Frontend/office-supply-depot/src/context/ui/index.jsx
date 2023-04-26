import { createContext, useContext, useState } from "react";
import { getProductData } from "../../data";

export const UIContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // TODO: Might have to bring all these functions to the useCart file (hooks/useCart)

  function getProductQuantity(id) {
    const quantity = cart.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCart([...cart, { id: id, quantity: 1 }]);
    } else {
      setCart(
        cart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCart(
        cart.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCart((cart) =>
      cart.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cart.map((item) => {
      const productData = getProductData(item.id);
      totalCost += productData.price * item.quantity;
    });
  }

  const value = {
    items: cart,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    drawerOpen,
    setDrawerOpen,
    showSearchBox,
    setShowSearchBox,
    setCart,
    showCart,
    setShowCart,
    cart,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
