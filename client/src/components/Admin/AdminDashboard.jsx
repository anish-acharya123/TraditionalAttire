import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AllProduct from "./AllProduct";
import AdminAddProductForm from "./AddProduct";
import CustomerDetails from "./CustomerDetails";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("allproduct");

  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  const logout = async () => {
    const res = await axios.get("http://localhost:2000/admin/logout", {
      withCredentials: true,
    });
    // toast.success(res.data.message);
    navigate(0);
  };

  return (
    <section className=" flex justify-center  items-center  ">
      <div className="overflow-hidden relative max-w-[1440px] justify-center px-8 w-full flex flex-col md:flex-col gap-12 sm:py-10 ">
        <div className="">
          <div className="w-full flex justify-between">
            <h2 className="text-[32px]">My Items Details:</h2>
            <button
              onClick={logout}
              className="border-none bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
          <div className="h-10 bg-[#ec8d9c] mt-4 flex items-center  gap-10 p-4 text-white">
            <NavLink
              onClick={() => handlesectionChange("allproduct")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>All Products</p>
            </NavLink>
            <NavLink
              onClick={() => handlesectionChange("addproduct")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>Add Products</p>
            </NavLink>
            <NavLink
              onClick={() => handlesectionChange("customerstatus")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>Customer Status</p>
            </NavLink>
          </div>

          <div className=" w-full mt-2">
            {activeSection === "allproduct" && <AllProduct />}
            {activeSection === "addproduct" && <AdminAddProductForm />}
            {activeSection === "customerstatus" && <CustomerDetails />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
