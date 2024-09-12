const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controller/userController");
const userTokenValidation = require("../utils/usertokenvalidation");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/usertoken-validate", userTokenValidation);

module.exports = router;
