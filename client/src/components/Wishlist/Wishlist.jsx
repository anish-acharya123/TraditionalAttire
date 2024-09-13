import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../context/UserAuthContext";
import { deletewhishlist, fetchWishProducts } from "../utils/wishProduct";

const Wishlist = ({ likeditem }) => {
  const { info } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetData = async () => {
      try {
        const res = await fetchWishProducts(info.email);
        setData(res.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetData();
  }, [info.email]);

  const deleteItem = async (id) => {
    try {
      await deletewhishlist(id, info.email);
      setData((prevData) => prevData.filter((item) => item._id !== id));
      alert("Wish item deleted successfully");
    } catch (error) {
      console.log("Wishlist item delete error", error);
    }
  };

  return (
    <section className="flex justify-center items-center">
      <div className="overflow-hidden relative max-w-[1440px] justify-between px-8 w-full flex flex-col md:flex-row gap-12 sm:py-24">
        <div className="w-full">
          {!likeditem && (
            <p className="text-left text-[#ec8d9c]">
              <Link to="/" className="hover:underline hover:text-black">
                Home
              </Link>{" "}
              / Wishlist
            </p>
          )}
          {!likeditem && (
            <div>
              <h2 className="text-center md:text-[44px] text-[40px] sm:block font-semibold text-[#ec8d9c]">
                Wish List
              </h2>
            </div>
          )}

          {/* Display when wishlist is empty */}
          {data.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              There are no items in your wishlist.
            </div>
          ) : (
            <div className="bg-red-200 flex px-4 flex-col flex-wrap justify-center lg:gap-8 gap-4 md:flex-row bg-opacity-15 md:items-start items-end py-4 w-full">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="shadow-md border-2 p-4 bg-gray-200 flex flex-col gap-4"
                >
                  <figure className="overflow-hidden">
                    <Link to={`/product/productid/${item._id}`}>
                      <img
                        src={item.images[0]}
                        alt="img"
                        className="w-40 h-40"
                      />
                    </Link>
                  </figure>
                  <div className="flex justify-center items-center gap-4">
                    <button className="py-2 px-4 border-2 border-[#ec8d9c] text-[#ec8d9c] rounded-md">
                      Add to cart
                    </button>
                    <button onClick={() => deleteItem(item._id)}>
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
      </div>
    </section>
  );
};

export default Wishlist;
