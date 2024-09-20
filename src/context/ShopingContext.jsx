import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₹';
  const delivery_fee = 100;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState([]); // State for the cart

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Product added to cart:", product);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cart,
    addToCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
