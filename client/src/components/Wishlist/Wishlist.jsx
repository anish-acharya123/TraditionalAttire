import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/UserAuthContext";

const Wishlist = () => {
  const { info } = useAuth();
  useEffect(() => {
    const fetData = async () => {
      const res = await axios.get(
        `http://localhost:2000/user/wishlist/${info.email}`
      );
      console.log(res.data.item);
    };
    fetData();
  }, []);

  return (
    <section className="flex justify-center  items-center">
      <div className="overflow-hidden relative max-w-[1440px] justify-between px-8 w-full flex flex-col md:flex-row gap-12 sm:py-24">
        <div className="w-full">
          <p className="text-left text-[#ec8d9c]">
            <Link to="/" className="hover:underline hover:text-black">
              Home
            </Link>{" "}
            / Whislist
          </p>
          <h2 className="text-center md:text-[44px] text-[40px]  sm:block  font-semibold text-[#ec8d9c]">
            Wish List
          </h2>
        </div>
        <div className=" bg-red-200 flex px-4 flex-col  lg:gap-8 gap-4 md:flex-row bg-opacity-15 justify-start md:items-start items-end py-4 px-2w-full "></div>
      </div>
    </section>
  );
};

export default Wishlist;
