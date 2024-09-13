import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import { Icon } from "@iconify/react";

const AllProduct = () => {
  const { info } = useAuth();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        `http://localhost:2000/admin/allproduct/${info.email}`
      );
      setProduct(res.data.product);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:2000/product/delete/${id}`);
    alert("Deleted item");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-left md:text-[38px] text-[40px]  sm:block  font-semibold text-[#ec8d9c] py-4">
        All Product
      </h1>
      {product.length == 0 ? (
        <div>Product count is 0</div>
      ) : (
        <div className="flex flex-wrap items-center lg:gap-10 md:gap-8 gap-4 lg:justify-center justify-center">
          {product.map((item, index) => (
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
              <div className="flex justify-center items-center">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex justify-center items-center border-2 py-2 px-4 rounded-md"
                >
                  Delete
                  <Icon
                    icon="material-symbols-light:delete-outline"
                    className="h-10 w-10 text-red-700"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProduct;
