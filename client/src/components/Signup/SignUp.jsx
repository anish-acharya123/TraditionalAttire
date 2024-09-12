import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";
import img from "../../assets/DaWear.png";

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState("");
  // if (formData.password !== formData.confirmPassword) {
  //   setError("Passwords do not match!");
  //   return;
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:2000/user/signup", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phonenumber,
      });

      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/signin");
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("There was an error submitting the form.");
    }
  };

  console.log(formData);
  return (
    <section className="flex items-center justify-center  sm:py-20  pt-0">
      <div className="px-8 flex md:gap-8  flex-col sm:pt-0  pt-12 pb-4 max-w-[1440px]">
        <button
          onClick={() => navigate("/")}
          className="text-center  bg-[#ec8d9c] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
        >
          ← Back
        </button>
        <h1 className="text-center md:text-[52px] text-[40px]  sm:block  font-semibold text-[#ec8d9c]">
          SIGNUP
        </h1>
        <div className="md:flex-row border-2 p-4 flex flex-col items-center gap-8 shadow-md  mt-4 sm:mt-0">
          <figure className="">
            <img src={img} alt="" className="md:h-[25rem]  h-[12rem]  " />
          </figure>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-6"
          >
            <div className="flex flex-col w-[20rem]">
              <label htmlFor="fullname" className="sm:text-[18px] ">
                Full Name:
              </label>

              <input
                className="border-2 p-2 rounded  "
                type="text"
                id="fullname"
                name="fullname"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
                placeholder="johndoe"
              />
            </div>
            <div className="flex flex-col w-[20rem]">
              <label htmlFor="phonenumber" className="sm:text-[18px] ">
                Phone Number:
              </label>

              <input
                className="border-2 p-2 rounded  "
                type="text"
                id="phonenumber"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                autoComplete="off"
                required
                placeholder="+977-9888888888"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="sm:text-[18px]">
                Email:
              </label>
              <input
                className="border-2 p-2 rounded "
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="sm:text-[18px]">
                Password:
              </label>
              <input
                className="border-2 p-2 rounded "
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                minLength={6}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cpassword" className="sm:text-[18px]">
                Confirm Password:
              </label>
              <input
                className="border-2 p-2 rounded text-[12px]"
                type="password"
                id="cpassword"
                name="cpassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="********"
                minLength={6}
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
              <input
                type="submit"
                // value={t("login.buttons.send_otp")}
                value="Create an Account"
                className="border-none cursor-pointer md:p-4 p-2 w-full rounded bg-[#ec8d9c] text-white mb-2"
              />
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/signin" className="text-[#ec8d9c] underline">
                Sign In
              </Link>
            </p>
            <p>
              SignUp as{" "}
              <Link to="/adminsignup" className="text-[#ec8d9c] underline">
                Admin
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
