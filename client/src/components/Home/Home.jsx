import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/welcome.jpg";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className=" flex justify-center  items-center  ">
      <div className="overflow-hidden relative max-w-[1440px] justify-between px-8 w-full flex flex-col md:flex-row gap-12 sm:py-24    flex-1">
        <div className="flex flex-col md:gap-12 gap-6 lg:w-1/2">
          <h1 className="text-left sm:text-[45px] lg:text-[55px] text-[30px] font-bold md:max-w-[65rem]  text-[#ec8d9c] ">
            Rent your dream outfit with TraditionalAttire.
          </h1>
          <p className="sm:text-[24px] text-[16px]">
            Try the latest trends without owning the clothes. <br /> Our rentals
            offer variety of traditional clothes at a great price.
          </p>
          <button
            onClick={() => navigate("/product/category")}
            className="bg-[#ec8d9c] hover:bg-white hover:text-[#ed7c8d]  transition-all border-2 border-[#ec8d9c] b text-white p-4 sm:w-[15rem] w-[12rem] sm:text-[16px] text-[15px] rounded"
          >
            All Products
          </button>
        </div>
        <div className="lg:block hidden border-2 rounded-full shadow-lg overflow-hidden ">
          <figure className="translate-y-4">
            <img  className= "w-[370px] h-[370px]" src={image} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Home;
