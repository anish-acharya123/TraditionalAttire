import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { fetchAllProducts } from "../utils/apiProduct";

const FilterByCategory = () => {
  const [toogle, setToogle] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAllProducts();
        const product = res.product;
        // console.log(product);
        setData(product);
      } catch (error) {
        console.log("fetch data error", error);
      }
    };
    fetchData();
  }, []);
  const item = [...new Set(data.map((product) => product.category))];
  useEffect(() => {
    if (data.length > 0) {
      setList(showMore ? item : item.slice(0, 5));
    }
  }, [data, showMore]);
  console.log(list);
  //   console.log();
  const handleChange = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <div className=" text-left flex md:gap-0 gap-4 md:flex-col justify-center items-start">
        <Link to="/product/category" className="">
          All Products
        </Link>
        <div className="text-[12px] lg:text-[16px] ">
          <label
            htmlFor="product"
            onClick={() => setToogle(!toogle)}
            className="transition-all cursor-pointer"
          >
            <span className="">
              Filter By Category
              <Icon
                icon="mingcute:down-line"
                className="text-white pl-2 h-8 w-8 inline"
              />
            </span>
          </label>
          <br />
          {toogle && (
            <div
              name="category"
              id="product"
              className="bg-transparent bg-[#db7c8a] p-4  flex flex-col transition-all border-none outline-none w-full bg-trnasparent"
            >
              {list.map((item, index) => (
                <div key={index}>
                  <Link
                    to={`/product/category/${item}`}
                    value="kids-wear"
                    className={({ isActive }) =>
                      isActive && " border-b-2 border-white"
                    }
                  >
                    {item}
                  </Link>
                </div>
              ))}
              <div className=" cursor-pointer" onClick={handleChange}>
                {showMore ? "Show Less" : "Show More"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterByCategory;
