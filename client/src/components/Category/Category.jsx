import React from "react";
import Categorylist from "./Categorylist";

const Category = () => {
  return (
    <section className="flex  py-10  w-full justify-center">
      <div className="max-w-[1440px]  overflow-hidden    w-full  px-6">
        <div className="flex flex-col md:flex-row items-start   md:items-center justify-between md:gap-4 gap-2">
          <h1 className="text-[20px] md:text-[32px] font-bold  min-w-fit text-[#ec8d9c]">
            SHOPE BY CATEGORY
          </h1>
          <div className="h-1 bg-gray-300 w-full" />
        </div>
        <Categorylist />
      </div>
    </section>
  );
};

export default Category;
