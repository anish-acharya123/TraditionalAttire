const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { adminSignin, adminSignup, adminproductadd } = require("../controller/adminController");
const admintokenvalidation = require("../utils/admintokenvalidation");

router.post("/signup", upload.single("storePhoto"), adminSignup);
router.post("/signin", adminSignin);
router.get("/admintoken-validate", admintokenvalidation);
router.post("/addproducts", upload.array("images"), adminproductadd);

module.exports = router;
