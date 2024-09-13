import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAddProductForm = () => {
  const navigate = useNavigate();
  const { info } = useAuth();
  const [formData, setFormData] = useState({
    category: "",
    gender: "",
    type: "",
    description: "",
    // size: [],
    availableCount: {},
    images: [],
    name: info?.name || "",
    phone: info?.phone || "",
    storeLocation: {
      address: info?.address || "",
    },
    email: info?.email || "",
  });

  const [priceInputs, setPriceInputs] = useState([{ size: "", price: "" }]);
  const [availableCountInputs, setAvailableCountInputs] = useState([
    { size: "", count: "" },
  ]);
  const [imageInputs, setImageInputs] = useState([""]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePriceChange = (index, field, value) => {
    const newPriceInputs = [...priceInputs];
    newPriceInputs[index][field] = value;
    setPriceInputs(newPriceInputs);

    const updatedPrice = {
      ...formData.price,
      [newPriceInputs[index].size]: parseFloat(newPriceInputs[index].price),
    };
    setFormData({ ...formData, price: updatedPrice });
  };

  const handleAvailableCountChange = (index, field, value) => {
    const newAvailableCountInputs = [...availableCountInputs];
    newAvailableCountInputs[index][field] = value;
    setAvailableCountInputs(newAvailableCountInputs);

    const updatedAvailableCount = {
      ...formData.availableCount,
      [newAvailableCountInputs[index].size]: parseInt(
        newAvailableCountInputs[index].count
      ),
    };
    setFormData({ ...formData, availableCount: updatedAvailableCount });
  };

  const handleAddPriceInput = () => {
    setPriceInputs([...priceInputs, { size: "", price: "" }]);
  };

  const handleAddAvailableCountInput = () => {
    setAvailableCountInputs([...availableCountInputs, { size: "", count: "" }]);
  };

  const [file, setFile] = useState();

  const handleImageChange = async (index, e) => {
    const newImageInputs = [...imageInputs];
    const file = e.target.files[0];
    setFile(file);

    const imageResponse = await ImageHandler(file);

    newImageInputs[index] = imageResponse;
    setImageInputs(newImageInputs);
    console.log(imageInputs);

    setFormData({ ...formData, images: newImageInputs });
  };

  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send formData to your backend
      const response = await axios.post(
        "http://localhost:2000/admin/addproducts",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Product added successfully
        alert("Product added successfully!");
      } else {
        alert("Failed to add product. Try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error occurred while adding the product.");
    }
  };

  // admin logout

  return (
    <div className="max-w-2xl mx-auto py-20  rounded-lg flex flex-col justify-center items-center">
      <div className="min-w-[1440px] w-full justify-center items-center flex flex-col px-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-10">
          <div>
            {/* Category Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Category"
              />
            </div>

            {/* Gender Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Gender"
              />
            </div>

            {/* Type Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Type"
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Description"
              />
            </div>

            {/* Price per Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price (per size)
              </label>
              {priceInputs.map((input, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={input.size.toUpperCase()}
                    onChange={(e) =>
                      handlePriceChange(
                        index,
                        "size",
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="Size (e.g., S, M, L)"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <input
                    type="number"
                    value={input.price}
                    onChange={(e) =>
                      handlePriceChange(index, "price", e.target.value)
                    }
                    placeholder="Price"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddPriceInput}
                className="mt-2 bg-indigo-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add another size
              </button>
            </div>
          </div>
          <div>
            {/* Available Count per Size */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Available Count (per size)
              </label>
              {availableCountInputs.map((input, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={input.size.toUpperCase()}
                    onChange={(e) =>
                      handleAvailableCountChange(
                        index,
                        "size",
                        e.target.value.toUpperCase()
                      )
                    }
                    placeholder="Size"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  <input
                    type="number"
                    value={input.count}
                    onChange={(e) =>
                      handleAvailableCountChange(index, "count", e.target.value)
                    }
                    placeholder="Available Count"
                    className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAvailableCountInput}
                className="mt-2 bg-indigo-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add another size count
              </button>
            </div>

            {/* Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              {imageInputs.map((input, index) => (
                <input
                  key={index}
                  type="file"
                  accept="image/*"
                  // value={file}
                  onChange={(e) => handleImageChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2"
                />
              ))}
              <button
                type="button"
                onClick={handleAddImageInput}
                className="mt-2 bg-indigo-600 text-white py-1 px-2 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add another image
              </button>
            </div>

            {/* Name Input */}
            <input type="hidden" name="name" value={formData.name} />
            <input type="hidden" name="phone" value={formData.phone} />
            <input
              type="hidden"
              name="storeLocation"
              value={formData.storeLocation.address}
            />

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>

        
      </div>
    </div>
  );
};

const ImageHandler = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "TradtionalAttire");

  const imageUploadString =
    "https://api.cloudinary.com/v1_1/ds23ganvj/image/upload";

  try {
    const response = await fetch(imageUploadString, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    return data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default AdminAddProductForm;
