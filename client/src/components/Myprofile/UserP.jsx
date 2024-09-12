import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../context/UserAuthContext";
import { NavLink } from "react-router-dom";
import Likeditems from "./Likeditems";
import Boughtitems from "./Boughtitems";
import Vieweditems from "./Vieweditems";

const UserP = () => {
  const { info } = useAuth();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  console.log(info);

  const [activeSection, setActiveSection] = useState("liked");

  const handlesectionChange = (section) => {
    setActiveSection(section);
  };

  const userlogOut = async () => {
    await axios.get(`http://localhost:2000/user/logout`, {
      withCredentials: true,
    });
    navigate(0);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const email = info.email;
        const response = await axios.get(
          `http://localhost:2000/user/getuser/${info.email}`
        );
        setData(response.data.user);
      };
      fetchData();
    } catch (error) {
      console.log("Error in fetching user", error);
    }
  }, [info]);



  return (
    <section className=" flex justify-center  items-center  ">
      <div className="overflow-hidden relative max-w-[1440px] justify-center px-8 w-full flex flex-col md:flex-col gap-12 sm:py-10 ">
        <h1 className="text-left sm:text-[45px] lg:text-[44px] text-[30px] font-bold md:max-w-[65rem]  text-[#ec8d9c] ">
          MY Profile
        </h1>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <h2 className="text-[32px]">
            {" "}
            <div className="flex gap-2 justify-center items-center">
              <span className="h-30 w-30 text-black">
                <Icon icon="streamline:user-profile-focus" />
              </span>
              My Information
            </div>
          </h2>
          <div className="flex flex-row bg-red- border-2 p-4 justify-center items-center rounded-md shadow-md w-full">
            <figure>
              <img src={data.image} alt="image" className="h-50 w-50" />
            </figure>
            <div>
              <div>
                <strong>My Id : </strong> <span> {data._id}</span>
              </div>
              <div>
                <strong>Name : </strong> <span> {data.name}</span>
              </div>
              <div>
                <strong>Email : </strong> <span> {data.email}</span>
              </div>
              <div>
                <strong>PhoneNumber : </strong> <span> {data.phone}</span>
              </div>
              <div>
                <strong>Role : </strong> <span> {data.role}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#ec8d9c] py-2 px-4 rounded-md text-white">
              Edit Profile
            </button>
            <button
              className="border-2 py-2 px-4 rounded-md"
              onClick={userlogOut}
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="">
          <h2 className="text-[32px]">My Items Details:</h2>
          <div className="h-10 bg-[#ec8d9c] mt-4 flex items-center  gap-10 p-4 text-white">
            <NavLink
              onClick={() => handlesectionChange("liked")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>Liked Items</p>
            </NavLink>
            <NavLink
              onClick={() => handlesectionChange("bought")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>Bought Items</p>
            </NavLink>
            <NavLink
              onClick={() => handlesectionChange("recent")}
              //   className={({ isActive }) => (isActive ? "text-black" : "")}
            >
              <p>Recently viewed Items</p>
            </NavLink>
          </div>

          <div className=" w-full mt-2">
            {activeSection === "liked" && <Likeditems />}
            {activeSection === "bought" && <Boughtitems />}
            {activeSection === "recent" && <Vieweditems />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserP;
