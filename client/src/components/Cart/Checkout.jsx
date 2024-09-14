import React from "react";
import { useAuth } from "../context/UserAuthContext";

export default function CheckoutPage() {
  const { info } = useAuth();

  const payload = {
    return_url: "http://localhost:5173",
    website_url: "http://localhost:5173",
    amount: 10000,
    purchase_order_id: `pay-${Math.random() * 3000}`,
    purchase_order_name: "loggedin_username_todo_fill_here",
    customer_info: {
      name: "random name",
      email: info?.email,
      phone: "9857089267",
    },
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
        window.location.href = `${result?.data?.payment_url}`;
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <button
        className="bg-black text-white py-3 px-7"
        onClick={handlePayusingKhalti}
      >
        Pay using khalti
      </button>
    </div>
  );
}
