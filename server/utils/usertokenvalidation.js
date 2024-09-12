const jwt = require("jsonwebtoken");
require("dotenv").config();

const userTokenValidation = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ isValid: true, info: decoded, role: "user" });
  } catch (error) {
    res.status(401).json({ isValid: false, message: "Invalid token" });
  }
};

module.exports = userTokenValidation;
