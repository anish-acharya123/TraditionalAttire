import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/DaWear.png";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";

const AdminHome = () => {
  const navigate = useNavigate();
  const { info } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:2000/admin/profile");
    };
  });

  return (
    <section className=" flex justify-center  items-center  ">
      <div className="overflow-hidden relative max-w-[1440px] justify-between px-8 w-full flex flex-col md:flex-row gap-12 sm:py-32    flex-1">
        <div className="flex flex-col md:gap-12 gap-6 lg:w-1/2">
          <h1 className="text-left sm:text-[45px] lg:text-[55px] text-[30px] font-bold md:max-w-[65rem]  text-[#ec8d9c] ">
            Welcome to the Seller Panel.
          </h1>
          <p className="sm:text-[20px] text-[16px]">
            Welcome to our Seller Panel! 🎉 Here, you can effortlessly sell your
            stylish clothes on a budget while keeping your costs low. <br />
            Our platform is designed to help you showcase your unique fashion
            pieces, earn money, and bring joy to your customers—all without
            stretching your wallet.
          </p>
          <button
            onClick={() => navigate("/profile")}
            className="bg-[#ec8d9c] hover:bg-white hover:text-[#ed7c8d]  transition-all border-2 border-[#ec8d9c] b text-white p-4 sm:w-[15rem] w-[12rem] sm:text-[16px] text-[15px] rounded"
          >
            Seller DashBoard
          </button>
        </div>
        <div className="lg:block hidden border-2 rounded-full shadow-lg overflow-hidden ">
          <figure className="translate-y-4">
            <img src={image} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default AdminHome;
