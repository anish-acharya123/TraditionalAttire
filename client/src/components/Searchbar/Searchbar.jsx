import React from "react";
import { Icon } from "@iconify/react";

const Searchbar = () => {
  const handleBtn = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form action="" className="flex items-center">
        <input
          type="text"
          name=""
          id=""
          className="border-2 px-2 md:rounded-r-none rounded-full sm:h-10 w-full md:w-[60rem] text-black max-w-3xl sm:max-w-md lg:max-w-2xl min-w-[50px] outline-none"
          placeholder="Search "
        />
        <button
          onClick={handleBtn}
          className="bg-[#ed6c7f] h-10 w-10  items-center justify-center rounded-full  rounded-l-none hidden sm:flex"
        >
          <Icon icon="carbon:search" className="text-white " />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
