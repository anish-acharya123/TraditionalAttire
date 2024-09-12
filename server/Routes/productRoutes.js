const express = require("express");
const router = express.Router();
const {
  AllProducts,
  getProductById,
} = require("../controller/productsController");

router.get("/productid/:id", getProductById);
router.get("/products", AllProducts);

module.exports = router;
