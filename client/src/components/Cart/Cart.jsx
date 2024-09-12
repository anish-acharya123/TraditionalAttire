import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price based on the selected size price
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity; // Use the price stored in the item
    }, 0);

    setTotalPrice(total);
  }, [cartItems]);

  const length = cartItems.length;

  if (length === 0) {
    return <h2 className="text-center py-20">Your cart is empty</h2>;
  }

  let Discount = 0;
  if (totalPrice < 1000) {
    Discount = 50;
  } else if (totalPrice < 5000) {
    Discount = 100;
  } else if (totalPrice < 10000) {
    Discount = 150;
  } else if (totalPrice < 50000) {
    Discount = 250;
  }

  return (
    <section className="flex justify-center items-center">
      <div className="overflow-hidden relative max-w-[1440px] justify-center items-end px-8 w-full flex flex-col gap-5 sm:py-16">
        <p className="text-left text-[#ec8d9c] text-[20px] w-full">
          <Link to="/" className="hover:underline hover:text-black underline">
            Home
          </Link>{" "}
          / cart
        </p>
        <h2 className="text-left sm:text-[45px] lg:text-[55px] text-[30px] font-bold md:max-w-[65rem] text-[#ec8d9c]">
          Your Cart
        </h2>
        <div className="flex justify-between w-full gap-10">
          <ul className="w-full flex flex-col gap-4 p-4 rounded-md">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-around bg-[#f6cbd1] p-2 items-center"
              >
                <figure>
                  <img
                    src={item.images[0]}
                    className="h-20 w-20 rounded-full"
                    alt=""
                  />
                </figure>
                <p>{item.type}</p>
                <p>Size: {item.size}</p>
                <p>Price per item: Rs {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: Rs {item.price * item.quantity}</p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="border-none bg-[#ec8d9c] text-white p-4 rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
            <div className="flex justify-end px-10">
              <button
                onClick={clearCart}
                className="bg-[#ec8d9c] p-4 rounded-md text-white w-fit"
              >
                Clear All
              </button>
            </div>
          </ul>
          <div className="p-8 h-fit bg-[#ec8d9c] text-white flex flex-col gap-4 text-center">
            <h3 className="text-[20px] font-semibold">Order Summary</h3>
            <div className="flex gap-4 p-2 border-t-2">
              {cartItems.slice(0, 2).map((item) => (
                <div key={item._id}>
                  <figure>
                    <img src={item.images[0]} alt="" className="h-32 w-32" />
                  </figure>
                </div>
              ))}
            </div>
            <p className="flex justify-between">
              <span>Item Total({length})</span>
              <span>Rs: {totalPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Store Pickup</span>
              <span> FREE</span>
            </p>
            <p className="flex justify-between">
              <span>Discount</span>
              <span> Rs: {Discount}</span>
            </p>
            <h3 className="flex justify-between border-t-2 py-2">
              <span className="font-semibold">Total Price</span>
              <span> Rs: {totalPrice - Discount}</span>
            </h3>
            <button className="py-2 px-4 bg-yellow-300 text-black rounded-md">
              Check Out
            </button>
            <p className="text-left text-[14px] max-w-[15rem]">
              Found these items at a cheaper price elsewhere? We price match.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
