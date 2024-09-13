import axios from "axios";

const BASE_URL = "http://localhost:2000/user/wishlist";

export const fetchWishProducts = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/${email}`);
    return response;
  } catch (error) {
    console.log(error, "error fetching wish list");
    throw error;
  }
};

export const deletewhishlist = async (id, email) => {
  console.log(id);
  try {
    const res = await axios.delete(`${BASE_URL}/${email}/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error deleting wish item:", error.response || error.message);
    throw error;
  }
};
