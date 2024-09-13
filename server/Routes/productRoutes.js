const express = require("express");
const router = express.Router();
const {
  AllProducts,
  getProductById,
  deleteProduct,
  latestProduct,
} = require("../controller/productsController");

router.get("/productid/:id", getProductById);
router.get("/products", AllProducts);
router.delete("/delete/:id", deleteProduct);
router.get("/latest-products", latestProduct)

module.exports = router;
