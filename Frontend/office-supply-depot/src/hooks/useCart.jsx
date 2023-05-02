import { useUIContext } from "../context/ui";

function useCart(product) {
  const { cart, setCart } = useUIContext();

  // change addToCart to just add the product to the cart with the quantity of 1
  // if the product is already in the cart, remove it from the cart

  const addToCart = () => {
    const itemIndex = cart.findIndex((c) => c.id === product.id);
    if (itemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart.splice(itemIndex, 1);
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart];
      updatedCart.push({ ...product, quantity: 1 });
      setCart(updatedCart);
    }
  };

  // const addToCart = () => {
  //   cart.findIndex((c) => c.id === product.id) >= 0
  //     ? setCart(cart.filter((c) => c.id !== product.id))
  //     : setCart((c) => [...c, product]);
  // };

  const addToCartText =
    cart.findIndex((c) => c.id === product.id) >= 0
      ? "Remove from Cart"
      : "Add to Cart";

  return { addToCart, addToCartText };
}

export default useCart;
