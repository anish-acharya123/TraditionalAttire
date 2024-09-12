const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  getUserbyemail,
  userLogout,
  likeproduct,
  wishproduct,
} = require("../controller/userController");
const userTokenValidation = require("../utils/usertokenvalidation");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/likeproduct/:id/:email", likeproduct);
router.get("/wishlist/:email", wishproduct);
router.get("/usertoken-validate", userTokenValidation);
router.get("/getuser/:email", getUserbyemail);
router.get("/logout", userLogout);

module.exports = router;
