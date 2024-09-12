import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/Traditional11.png";
import Searchbar from "../Searchbar/Searchbar";
import { Icon } from "@iconify/react";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [itemNumber, setItemNumber] = useState(0);
  const { cartItems } = useContext(CartContext);
  // console.log(cart)
  useEffect(() => {
    setItemNumber(cartItems.length);
  }, [cartItems]);

  return (
    <section className="sticky py-4 top-0    flex items-center justify-center shadow-md bg-[#ec8d9c]  w-full z-50">
      <div className="flex items-center justify-between  max-w-[1440px] px-8 w-full text-white">
        <figure className=" border-2 bg-white rounded-lg ">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="h-[50px] w-[50px] lg:h-[80px] lg:w-[80px]"
            />
          </Link>
        </figure>

        <div>
          <Searchbar />
        </div>
        <div className="flex gap-4">
          <Link to="/profile">
            <Icon icon="gg:profile" className="text-white h-10 w-10" />
          </Link>
          <Link to="/wishlist">
            <Icon icon="mingcute:love-line" className="text-white h-10 w-10" />
          </Link>
          <Link to="/cart" className="relative">
            <Icon icon="mdi:cart" className="relative text-white h-10 w-10" />
            <p className="absolute top-0 right-0 translate-x-3 text-[#46282d] text-[px] bg-white rounded-full px-3 py-1  ">
              {itemNumber}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
