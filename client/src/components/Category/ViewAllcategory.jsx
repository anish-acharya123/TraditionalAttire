import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../utils/apiProduct"; // Import your API service

const ViewAllcategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllProducts();
        const product = res.product;
        console.log(product);
        const uniqueCategories = product.reduce((acc, item) => {
          if (!acc.some((obj) => obj.category === item.category)) {
            acc.push({ category: item.category, image: item.images[0] });
          }
          return acc;
        }, []);
        setData(uniqueCategories);
        console.log(uniqueCategories);
      } catch (error) {
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="  flex  py-10  w-full justify-center flex-col items-center gap-10">
      <div className="max-w-[1440px] text-left w-full">
        <p className="text-left text-[#ec8d9c]">
          <Link to="/" className="hover:underline hover:text-black">
            Home
          </Link>{" "}
          / Allcategory
        </p>
        <h2 className="max-w-[1440px]   w-full text-center  md:text-[44px] text-[40px]  sm:block  font-semibold text-[#ec8d9c] ">
          All Categories List
        </h2>
      </div>
      <div className="max-w-[1440px]  overflow-hidden flex flex-wrap justify-evenly  items-center gap-4   px-6 ">
        {data.map((item, index) => (
          <div
            key={index}
            className=" p-2 relative md:p-0 md:relative overflow-hidden rounded-lg bg-white grid gap-4 place-content-center text-[#ec8d9c] shadow-md"
          >
            <figure className="h-[5rem]  w-full sm:h-[15rem] relative ">
              <Link to={`/product/category/${item.category}`}>
                <img
                  alt="items"
                  src={item.image}
                  className="md:h-[20rem] md:w-[20rem] h-full z-30 cursor-pointer w-full object- hover:scale-105 transition-all"
                />
                {/* <div className=" md:block hidden absolute inset-0 bg-gray-700 bg-opacity-50 pointer-events-none "></div> */}
              </Link>
            </figure>
            <h2 className="absolute  md:text-black bg-white p-2 border-2 rounded-full md:absolute top-0 text-[15px] sm:text-[16px] md:text-[18px] font-bold md:font-normal translate-x-[10%] translate-y-[10%] text-center">
              {item.category}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewAllcategory;
