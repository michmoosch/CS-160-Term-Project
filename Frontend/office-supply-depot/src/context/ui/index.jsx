import { createContext, useContext, useState } from "react";

export const UIContext = createContext({
  items: [],
  getProductQuantity: () => {},
});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  function getProductQuantity(id) {
    const quantity = cart.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  const value = {
    items: cart,
    getProductQuantity,
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
