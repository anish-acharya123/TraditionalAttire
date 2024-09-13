import axios from "axios";

const BASE_URL = "http://localhost:2000/product";

// No default values here
export const fetchAllProducts = async (
  categoryName = "allproducts",
  price = "0"
) => {
  // console.log(categoryName);
  try {
    let query = "";

    // Add categoryName only if provided
    if (categoryName) {
      query += `categoryName=${categoryName}`;
    }

    // Add price regardless of categoryName
    if (price) {
      query += `${query ? "&" : ""}price=${price}`; // Append with "&" if categoryName is present
    }

    // console.log("Query string:", query);

    const response = await axios.get(`${BASE_URL}/products?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};
