import React from 'react'
import FilterByCategory from "./FilterByCategory"
import FilterByPrice from './FilterByPrice';

const Filter = () => {
  return (
    <section className=" text-white text-left py-2 px-4 ">
      <h3 className="md:text-[32px] text-[20px]">Filter</h3>
      <FilterByCategory />
      <FilterByPrice />
    </section>
  );
};

export default Filter