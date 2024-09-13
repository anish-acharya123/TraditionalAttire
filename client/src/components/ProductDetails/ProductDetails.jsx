import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import ProductImageZoom from "../utils/ProductImageZoom";
import { useAuth } from "../context/UserAuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [imgIndex, setImgindex] = useState(0);
  const [size, setSize] = useState("S");
  const { addToCart } = useContext(CartContext);
  const { info } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:2000/product/productid/${id}`
        );
        setData(res.data.product);
      } catch (error) {
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        await axios.post(`http://localhost:2000/user/vieweditems`, {
          id,
          email: info.email,
        });
      } catch (error) {
        console.log("error insert");
      }
    })();
  });
  const LikeItem = async () => {
    await axios.post(
      `http://localhost:2000/user/likeproduct/${id}/${info.email}`
    );
  };

  return (
    <section className="flex flex-col  justify-center items-center gap-4 py-24">
      <div className="max-w-[1440px] flex flex-wrap gap-8 flex-row justify-center items-center py-4 px-2 place-content-center w-full ">
        {data ? (
          <div className="flex gap-10 justify-between p-4 items-center">
            <figure className="h-30 w-30 flex gap-2 flex-col justify-center items-center">
              {data.images.map((item, index) => (
                <button
                  onClick={() => setImgindex(index)}
                  className="flex "
                  key={index}
                >
                  <img src={item} alt="" className="h-20 w-20" />
                </button>
              ))}
            </figure>
            <div className="grid gap-4">
              <h1 className="md:text-[44px] text-[40px] sm:block font-semibold text-left">
                {data.type}
              </h1>

              <figure className="h-[5rem] w-[5rem] sm:w-[30rem] sm:h-[30rem] relative overflow-hidden">
                <ProductImageZoom image={data.images[imgIndex]} />
              </figure>
            </div>
            <div className="bg-red-50 ">
              <div className="p-4 text-[20px] flex flex-col gap-4">
                <div className="flex gap-8">
                  <div className="text-[#ec8d9c] flex items-center gap-4">
                    <Icon icon="iconamoon:store-light" className="h-10 w-10" />
                    <span className="text-[20px]">In-Store Pickup</span>
                  </div>
                  <div className="text-[#ec8d9c] flex items-center gap-4">
                    <Icon icon="mdi:truck-fast-outline" className="h-10 w-10" />
                    <span className="text-[20px]">Express Shipping</span>
                  </div>
                </div>
                <h2 className="text-[15px] sm:text-[16px] md:text-[18px] text-center items-center flex gap-4">
                  <span className="text-[40px] sm:block font-semibold text-left">
                    Rs: {data.price[size]}{" "}
                    <span className="text-[20px]">{size}</span>
                  </span>
                  <span> inclusive of VAT</span>
                </h2>

                <hr className="h-1 bg-black" />
                <div>
                  <p>Choose Variant</p>
                </div>
                <p className="flex gap-2">
                  {Object.keys(data.availableCount).map((item) => (
                    <button
                      key={item}
                      className={`p-2 border-2 rounded-md ${
                        data.availableCount[item] === 0
                          ? "bg-red-400 cursor-not-allowed"
                          : "bg-gray-300"
                      }`}
                      onClick={() => setSize(item)}
                      disabled={data.availableCount[item] === 0}
                    >
                      {item} -{" "}
                      {data.availableCount[item] > 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </button>
                  ))}
                </p>
                <div className="flex gap-4">
                  <button
                    className="border-2 py-2 px-4 rounded-md bg-gray-100"
                    onClick={() => addToCart(data, size)}
                    disabled={data.availableCount[size] === 0}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={LikeItem}
                    className="border-2 py-2 px-4 rounded-md bg-pink-200 border-pink-200"
                  >
                    Wish-list
                  </button>
                  <button className="border-none py-2 px-4 rounded-md bg-[#ec8d9c] text-white">
                    Buy Now
                  </button>
                </div>
                <div className="max-w-[25rem] text-[18px]">
                  {data.description}
                </div>
              </div>
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
