import React, { createContext, useState, useEffect } from "react";
import { fetchWishProducts } from "../utils/wishProduct";
import { useAuth } from "./UserAuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { info } = useAuth();

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const res = await fetchWishProducts(info.email);
        setWishlist(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    if (info.email) {
      fetchWishlistData();
    }
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
