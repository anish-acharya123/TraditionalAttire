const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  adminSignin,
  adminSignup,
  adminproductadd,
  adminlogout,
  allproducts,
} = require("../controller/adminController");
const admintokenvalidation = require("../utils/admintokenvalidation");

router.post("/signup", upload.single("storePhoto"), adminSignup);
router.post("/signin", adminSignin);
router.get("/logout", adminlogout);
router.get("/admintoken-validate", admintokenvalidation);
router.post("/addproducts", upload.array("images"), adminproductadd);
router.get("/allproduct/:email", allproducts);

module.exports = router;
