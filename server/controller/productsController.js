const Post = require("../models/Post");

const AllProducts = async (req, res) => {
  try {
    // const category = req.params.categoryName;
    const { categoryName, price } = req.query;
    // console.log(price);
    if (categoryName === "allproducts" && price === "0") {
      const data = await Post.find({});
      // console.log(data);
      return res
        .status(200)
        .json({ product: data, msg: "Products fetched successfully" });
    } else {
      if (categoryName && categoryName !== "allproducts") {
        const data = await Post.find({ category: categoryName });
        if (data.length === 0) {
          return res
            .status(404)
            .json({ msg: "No products found for the given category" });
        }
        return res
          .status(200)
          .json({ product: data, msg: "Products fetched successfully" });
      }

      if (price) {
        const priceFilter = Number(price);
        const sizeFields = ["S", "M", "L", "XL"];
        const orConditions = sizeFields.map((size) => ({
          [`price.${size}`]: { $lt: priceFilter },
        }));
        const data = await Post.find({
          $or: orConditions,
        });
        // console.log(data);
        if (data.length === 0) {
          return res
            .status(404)
            .json({ msg: "No products found for the given category" });
        }
        return res
          .status(200)
          .json({ product: data, msg: "Products fetched successfully" });
      }
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    console.log("anish");
    const product = await Post.findOne({ _id: id });
    // console.log(product);
    if (!product) {
      return res.status(402).json({ msg: "Product details not found" });
    }
    res.status(200).json({ product, msg: "sucess fetching details" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { AllProducts, getProductById };
