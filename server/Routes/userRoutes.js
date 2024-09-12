const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  getUserbyemail,
  userLogout,
} = require("../controller/userController");
const userTokenValidation = require("../utils/usertokenvalidation");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/usertoken-validate", userTokenValidation);
router.get("/getuser/:email", getUserbyemail);
router.get("/logout", userLogout);

module.exports = router;
