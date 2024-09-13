import React from "react";
import Home from "../Home/Home";
import Category from "../Category/Category";
import Recommendations from "../Youmaylike/Recommendations";
import Recommend from "../Youmaylike/Recommend";

const Landingpage = () => {
  return (
    <div>
      <Home />
      {/* <Recommend /> */}
      <Category />
      <Recommendations />
    </div>
  );
};

export default Landingpage;
