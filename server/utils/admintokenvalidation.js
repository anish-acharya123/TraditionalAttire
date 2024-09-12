const jwt = require("jsonwebtoken");
require("dotenv").config();

const admintokenvalidation = async (req, res) => {
  const admintoken = req.cookies.admintoken;

  if (!admintoken) {
    return res
      .status(401)
      .json({ isValid: false, message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(admintoken, process.env.JWT_SECRET); 
    console.log(decoded)
    res.status(200).json({ isValid: true, info: decoded, role: "admin" });
  } catch (error) {
    res.status(401).json({ isValid: false, message: "Invalid token" });
  }
};

module.exports = admintokenvalidation;
