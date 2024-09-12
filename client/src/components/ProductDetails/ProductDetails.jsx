import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log(id);
  // console.log(`http://localhost:2000/product/productid/${id}`);
  useEffect(() => {
    console.log(id);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2000/product/productid/${id}`
        );

        console.log(res);
        setData(res.data.product);
      } catch (error) {
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, [id]);

  console.log(data);
  return (
    <section className="flex flex-col  justify-center items-center gap-4 py-24">
      <div className="max-w-[1440px] flex flex-wrap gap-8 flex-row  justify-center items-center py-4 px-2 place-content-center w-full ">
        {data ? (
          <div className="flex  gap-10 bg-red-50 justify-between p-4 items-">
            <div>
              <h1 className=" md:text-[44px] text-[40px]  sm:block  font-semibold  text-left">
                {data.type}
              </h1>
              <figure className="h-[5rem] w-[5rem] sm:w-[30rem] sm:h-[30rem] relative overflow-hidden">
                <img
                  alt="items"
                  src={data.image}
                  className="h-full w-full hover:scale-105 transition-all"
                />
              </figure>
            </div>
            <div className="p-4 text-[20px] flex flex-col gap-4">
              <div className="flex gap-8">
                <div className="text-[#ec8d9c] flex items-center gap-4">
                  <Icon icon="iconamoon:store-light" className=" h-10 w-10" />
                  <span className="text-[20px]"> In-Store Pickup</span>
                </div>
                <div className="text-[#ec8d9c] flex items-center gap-4">
                  <Icon icon="mdi:truck-fast-outline" className=" h-10 w-10" />
                  <span className="text-[20px]"> Express Shipping</span>
                </div>
              </div>
              <h2 className="text-[15px] sm:text-[16px] md:text-[18px] text-center items-center flex gap-4">
                <span className="text-[40px] sm:block  font-semibold  text-left ">
                  Rs: {data.rentPrice}{" "}
                </span>
                <span> inclusive of VAT</span>
              </h2>
              <p>Rs: {data.rentPrice}</p>
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
