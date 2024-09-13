import React from "react";
import Home from "../Home/Home";
import Category from "../Category/Category";
import Recommendations from "../Youmaylike/Recommendations";
import { useAuth } from "../context/UserAuthContext";
import AdminHome from "../Admin/AdminHome";

const Landingpage = () => {
  const { role } = useAuth();
  console.log(role);

  return (
    <div>
      {role === "admin" ? (
        <AdminHome />
      ) : (
        <div>
          <Home />
          <Category />
          <Recommendations />
        </div>
      )}
    </div>
  );
};

export default Landingpage;
