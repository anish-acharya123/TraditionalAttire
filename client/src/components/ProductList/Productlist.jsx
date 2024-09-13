import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchAllProducts } from "../utils/apiProduct";
import axios from "axios";
import { Icon } from "@iconify/react";
import Filter from "../Filter/Filter";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/UserAuthContext";

const Productlist = () => {
  const { info } = useAuth();
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const { categoryName } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const price = queryParams.get("price");
  const { addToCart } = useContext(CartContext);
  // console.log(categoryName);
  // console.log(price);
  // console.log(price);

  const LikeItem = async (id) => {
    await axios.post(
      `http://localhost:2000/user/likeproduct/${id}/${info.email}`
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;

        if (!price) {
          res = await fetchAllProducts(categoryName);
          // console.log(res)
        } else if (price) {
          res = await fetchAllProducts(categoryName, price);
        }

        const product = res?.product;
        console.log(product);
        setData(product);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(error.response.msg);
          }
        }
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, [categoryName, price]);

  return (
    <section className="flex flex-col  justify-center items-center gap-4 py-12">
      <div className="max-w-[1440px] px-6 w-full flex flex-col gap-10">
        <div className=" w-full">
          <p className="text-left text-[#ec8d9c]">
            <Link to="/" className="hover:underline hover:text-black">
              Home
            </Link>{" "}
            / {categoryName || "all-products"}
          </p>
          <h2 className="text-center md:text-[44px] text-[40px]  sm:block  font-semibold text-[#ec8d9c]">
            {categoryName ? categoryName.toUpperCase() : "All PRODUCTS"}
            'S LISTS
          </h2>
        </div>
        <div className=" bg-red-200 flex px-4 flex-col  lg:gap-8 gap-4 md:flex-row bg-opacity-15 justify-start md:items-start items-end py-4 px-2w-full ">
          <div className="bg-[#ec8d9c]  lg:min-w-[15rem] md:min-w-[15rem] w-fit">
            <Filter />
          </div>
          {/* <div className="grid xl:grid-cols-4  place-items-center lg:grid-cols-3 sm:grid-cols-2 place-content-center gap-8 "> */}
          <div className="flex flex-wrap items-center lg:gap-10 md:gap-8 gap-4 lg:justify-center justify-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="p-2 leading-[130%] mb-8 text-center rounded-lg  bg-white grid gap-2 place-content-center  place-items-center shadow-md"
              >
                <figure className="h-[9rem] w-[9rem] md:w-[13rem] p-2 md:h-[13rem] relative overflow-hidden">
                  <Link to={`/product/productid/${item._id}`}>
                    <img
                      alt="items"
                      src={item.images[0]}
                      className="h-full w-full hover:scale-105 transition-all"
                    />
                  </Link>
                </figure>
                <div>
                  <h2 className="text-[15px] sm:text-[16px] md:text-[18px]  text-center">
                    {item.type}
                  </h2>
                  <p>Rs: {item.price.S || item.price.M || item.price.L}</p>
                </div>
                <div className="flex">
                  <Icon
                    icon="material-symbols-light:star-rate"
                    className="text-yellow-300 h-8 w-8"
                  />
                  <Icon
                    icon="material-symbols-light:star-rate"
                    className="text-yellow-300 h-8 w-8"
                  />
                  <Icon
                    icon="material-symbols-light:star-rate"
                    className="text-yellow-300 h-8 w-8"
                  />
                  <Icon
                    icon="material-symbols-light:star-rate"
                    className="text-yellow-300 h-8 w-8"
                  />
                  <Icon
                    icon="material-symbols-light:star-rate-outline"
                    className="text-yellow-300 h-8 w-8"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-[#ec8d9c] hover:bg-white hover:text-[#ed7c8d]  transition-all border-2 border-[#ec8d9c]  text-white p-1 py-2 sm:w-[5rem]  text-[12px] rounded"
                  >
                    Add To cart
                  </button>
                  <button
                    onClick={() => LikeItem(item._id)}
                    className="border-2 px-2 py-2 rounded text-[14px]"
                  >
                    WishList
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productlist;
