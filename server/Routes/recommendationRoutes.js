const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controller/recommendationController");

router.get("/", verifyToken);

module.exports = router;
