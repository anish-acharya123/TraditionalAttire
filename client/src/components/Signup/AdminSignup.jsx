import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";
import img from "../../assets/DaWear.png";

const AdminSignup = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    brandName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    cpassword: "",
  });
  const [storePhoto, setStorePhoto] = useState(null); // Handle file separately
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change separately
  const handleFileChange = (e) => {
    setStorePhoto(e.target.files[0]); // Store file object
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (formData.password !== formData.cpassword) {
      setError("Passwords do not match!");
      return;
    }

    // Create FormData and append the form fields and file
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (storePhoto) {
      data.append("storePhoto", storePhoto); // Append file to FormData
    }

    try {
      const response = await axios.post(
        "http://localhost:2000/admin/signup",
        data, // Send FormData instead of formData object
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData requires this header
          },
        }
      );

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

  return (
    <section className="flex items-center justify-center sm:py-20 pt-0">
      <div className="px-8 flex md:gap-8 flex-col sm:pt-0 pt-12 pb-4 max-w-[1440px]">
        <button
          onClick={() => navigate("/")}
          className="text-center bg-[#ec8d9c] text-white w-fit px-4 py-2 rounded md:text-[16px] text-[12px]"
        >
          ← Back
        </button>
        <h1 className="text-center md:text-[52px] text-[40px] sm:block font-semibold text-[#ec8d9c]">
          SELLER SIGNUP
        </h1>
        <div className="md:flex-row border-2 p-4 flex flex-col items-center gap-8 shadow-md mt-4 sm:mt-0">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 pb-6 md:pb-0 md:pr-6"
          >
            <div className="flex gap-10">
              <div className="flex gap-4 flex-col">
                <div className="flex flex-col w-[20rem]">
                  <label htmlFor="brandName" className="sm:text-[18px]">
                    Brand Name:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="text"
                    id="brandName"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    required
                    placeholder="Apple, Kick, etc."
                  />
                </div>

                <div className="flex flex-col w-[20rem]">
                  <label htmlFor="phoneNumber" className="sm:text-[18px]">
                    Phone Number:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+977-9888888888"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address" className="sm:text-[18px]">
                    Address:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Sainamaina-**-Rupandehi"
                  />
                </div>

                <div className="flex flex-col w-[20rem]">
                  <label htmlFor="storePhoto" className="sm:text-[18px]">
                    Store Photo:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="file" // File input for the photo
                    id="storePhoto"
                    name="storePhoto"
                    accept="image/*"
                    onChange={handleFileChange} // Handle file change
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-col">
                <div className="flex flex-col w-[20rem]">
                  <label htmlFor="email" className="sm:text-[18px]">
                    Email:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="johndoe@gmail.com"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password" className="sm:text-[18px]">
                    Password:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="********"
                    minLength={6}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="cpassword" className="sm:text-[18px]">
                    Confirm Password:
                  </label>
                  <input
                    className="border-2 p-2 rounded"
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={formData.cpassword}
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
                    value="Create an Account"
                    className="border-none cursor-pointer md:p-4 p-2 w-full rounded bg-[#ec8d9c] text-white mb-2"
                  />
                </div>
              </div>
            </div>
            <p>
              Already have an account?{" "}
              <Link to="/adminsignin" className="text-[#ec8d9c] underline">
                Sign In
              </Link>
            </p>
            <p>
              Signup as customer{" "}
              <Link to="/signup" className="text-[#ec8d9c] underline">
                Customer
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminSignup;
