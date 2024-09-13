import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";
import img from "../../assets/DaWear.png";

const SignIn = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
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

    try {
      const response = await axios.post(
        "http://localhost:2000/user/signin",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Form Login successfully!");
        // window.location.reload();
        navigate(0);
      } else {
        alert("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("There was an error login the form!", error);
      setError("There was an error login the form.");
    }
  };
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
          SIGN-IN
        </h1>
        <div className="md:flex-row border-2 p-4 flex flex-col items-center gap-8 shadow-md  mt-4 sm:mt-0">
          <figure className="">
            <img src={img} alt="" className="md:h-[25rem]  h-[12rem]  " />
          </figure>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-6"
          >
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
              />
            </div>

            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
              <input
                type="submit"
                value="Login"
                className="border-none cursor-pointer md:p-4 p-2 w-full rounded bg-[#ec8d9c] text-white mb-2"
              />
            </div>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#ec8d9c] underline">
                Create an account
              </Link>
            </p>
            <p>
              Sign in as Admin{" "}
              <Link to="/adminsignin" className="text-[#ec8d9c] underline">
                Seller
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
