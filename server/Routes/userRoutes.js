const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  getUserbyemail,
  userLogout,
  likeproduct,
  wishproduct,
  deletewishhlist,
  viewedproducts,
} = require("../controller/userController");
const userTokenValidation = require("../utils/usertokenvalidation");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/likeproduct/:id/:email", likeproduct);
router.get("/wishlist/:email", wishproduct);
router.delete("/wishlist/:email/:id", deletewishhlist);
router.get("/usertoken-validate", userTokenValidation);
router.get("/getuser/:email", getUserbyemail);
router.get("/logout", userLogout);
router.post("/vieweditems", viewedproducts);

module.exports = router;
