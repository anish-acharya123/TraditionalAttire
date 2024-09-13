import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Fuse from "fuse.js";
import { fetchAllProducts } from "../utils/apiProduct"; // Adjust the path according to your project structure

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await fetchAllProducts();
        console.log("Fetched products:", products.product);
        setAllProducts(products.product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const fuse = new Fuse(allProducts, {
        keys: ["name", "type", "description", "category"],
        threshold: 0.4,
      });

      const results = fuse.search(searchTerm);
      setFilteredProducts(results.map((result) => result.item));
      console.log("Filtered products:", filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, allProducts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBtn = (e) => {
    e.preventDefault();
    // Optional: Handle form submission or search results
  };

  return (
    <div className="relative">
      <form onSubmit={handleBtn} className="flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleChange}
          className="border-2 px-2 md:rounded-r-none rounded-full sm:h-10 w-full md:w-[60rem] text-black max-w-3xl sm:max-w-md lg:max-w-2xl min-w-[50px] outline-none"
          placeholder="Search"
        />
        <button
          type="submit"
          className="bg-[#ed6c7f] h-10 w-10 items-center justify-center rounded-full rounded-l-none hidden sm:flex"
        >
          <Icon icon="carbon:search" className="text-white" />
        </button>
      </form>
      {/* Optional: Display filtered products */}
      {searchTerm && (
        <div className="absolute bg-white shadow-lg mt-2 p-4 rounded-lg w-full z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="p-2">
                <a
                  href={`/product/productid/${product._id}`}
                  className="text-black hover:underline"
                >
                  {product.type}
                </a>
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
