import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../utils/apiProduct"; // Import your API service

const Categorylist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllProducts();
        const product = res.product;
        console.log(product)
        const uniqueCategories = product.reduce((acc, item) => {
          if (!acc.some((obj) => obj.category === item.category)) {
            acc.push({ category: item.category, image: item.image });
          }
          return acc;
        }, []);
        setData(uniqueCategories.slice(0, 6));
      } catch (error) {
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="grid bg-[#ec8d9c] bg-opacity-15 gap-4 grid-cols-2  md:grid-cols-3 justify-evenly py-4 px-2 place-content-center w-full ">
        {data.map((item, index) => (
          <div
            key={index}
            className=" p-2 md:p-0 md:relative overflow-hidden rounded-lg bg-white grid gap-4 place-content-center text-[#ec8d9c] shadow-md"
          >
            <figure className="h-[5rem] k w-full sm:h-[15rem] relative ">
              <Link to={`/product/category/${item.category}`}>
                <img
                  alt="items"
                  src={item.image}
                  className="md:h-[20rem] md:w-[30rem] h-full z-30 cursor-pointer w-full object- hover:scale-105 transition-all"
                />
              <div className=" md:block hidden absolute inset-0 bg-gray-700 bg-opacity-50 pointer-events-none "></div>
              </Link>
            </figure>
            <h2 className=" md:text-white md:absolute top-0 text-[15px] sm:text-[16px] md:text-[18px] font-bold md:font-normal translate-x-[50%] translate-y-[50%] text-center">
              {item.category}
            </h2>
          </div>
        ))}
      </div>
      <button className="p-4 text-[15px] md:text-[16px] w-fit bg-[#ec8d9c] hover:bg-white hover:text-[#ed7c8d] transition-all border-2 border-[#ec8d9c] text-white">
        Check All Categories
      </button>
    </div>
  );
};

export default Categorylist;
