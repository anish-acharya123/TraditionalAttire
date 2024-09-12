import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const FilterByPrice = () => {
  const [toogle, setToogle] = useState(false);
  return (
    <div>
      <div className=" text-left flex md:gap-0 gap-4 md:flex-col justify-center items-start">
        <div className="text-[12px] lg:text-[16px] ">
          <label
            htmlFor="product"
            onClick={() => setToogle(!toogle)}
            className="transition-all cursor-pointer"
          >
            <span className="">
              Filter By Price
              <Icon
                icon="mingcute:down-line"
                className="text-white pl-2 h-8 w-8 inline"
              />
            </span>
          </label>
          <div
            name="category"
            id="product"
            className="bg-transparent  flex flex-col transition-all border-none outline-none w-full bg-trnasparent"
          >
            {toogle && (
              <div className="flex flex-col bg-[#db7c8a] p-4 ">
                <Link to={`/product/category/?price=${"200"}`}>
                  Less than 200
                </Link>
                <Link to={`/product/category/?price=${"500"}`}>
                  Less than 500
                </Link>
                <Link to={`/product/category/?price=${"600"}`}>
                  Less than 600
                </Link>
                <Link to={`/product/category/?price=${"700"}`}>
                  Less than 700
                </Link>
                <Link to={`/product/category`}>Others</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByPrice;
