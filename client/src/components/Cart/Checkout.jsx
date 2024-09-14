import React, { useContext } from "react";
import { useAuth } from "../context/UserAuthContext";
import { CartContext } from "../context/CartContext";

export default function CheckoutPage() {
  const { info } = useAuth();

  const { totalPrice, totalPriceFunction, cartItems, clearCart } =
    useContext(CartContext);

  const price = totalPriceFunction();
  const purchase_order_id = `pay-${Math.random() * 3000}`;
  const purchase_order_name = `ordername-${Math.random() * 3000}`;

  const payload = {
    amount: price,
    purchase_order_id,
    purchase_order_name,
    customer_info: {
      name: "random name",
      email: info?.email,
      phone: "9857089267",
    },
    website_url: "http://localhost:5173",
    return_url: "http://localhost:5173/success",
  };

  const sendBroughtItems = {
    status: "pending",
    purchase_order_id,
    total_price: price,
    purchase_order_name,
    broughtItems: cartItems,
  };

  const handlePayusingKhalti = async () => {
    try {
      const response = await fetch(`http://localhost:2000/payment/khalti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result?.success) {
        const addToBroughtItems = await fetch("api_url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendBroughtItems),
        });

        const responseOfBroughtItems = await addToBroughtItems.json();

        if (responseOfBroughtItems.status === 200) {
          clearCart();
          window.location.href = `${result?.data?.payment_url}`;
        }
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <>
      <div className="container mx-auto py-10">
        <button
          className="bg-black text-white py-3 px-7"
          onClick={handlePayusingKhalti}
        >
          Pay using khalti
        </button>

        <div>total price: {JSON.stringify(totalPrice)}</div>
      </div>
    </>
  );
}
