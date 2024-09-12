import React, { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/UserAuthContext";

const Wishlist = () => {
  useEffect(() => {
    const fetData = async () => {
      const res = await axios.get(``);
    };
  }, []);

  return (
    <section className="flex justify-center  items-center">
      <div className="overflow-hidden relative max-w-[1440px] justify-between px-8 w-full flex flex-col md:flex-row gap-12 sm:py-24">
        <div className="w-full">
          <p className="text-left text-[#ec8d9c]">
            <Link to="/" className="hover:underline hover:text-black">
              Home
            </Link>{" "}
            /
          </p>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
