import React, { createContext, useState, useEffect } from "react";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/storage";

// Create the Cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart && savedCart.length > 0) {
      setCartItems(savedCart);
    }
  }, []);

  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = (product, size = "S") => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item._id === product._id);

      const priceForSize = product.price[size];

      if (itemExists) {
        return prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                size,
                price: priceForSize,
              }
            : item
        );
      } else {
        return [
          ...prevItems,
          { ...product, quantity: 1, size, price: priceForSize },
        ];
      }
    });
  };

  // console.log(cartItems);

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const totalPriceFunction = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    setTotalPrice(total);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        totalPriceFunction,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
