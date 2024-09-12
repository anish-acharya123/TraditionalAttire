const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { fullname, phonenumber, email, password } = req.body;
  console.log(req.body);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: fullname,
      email,
      phone: phonenumber,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Invalid format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    const payload = {
      email: user.email,
    };

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Setting cookie and sending response...");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      path: "/",
    });
    console.log("Cookie set successfully, sending 200 response...");
    res.status(200).json({ msg: "Success login", success: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Interser server error", error });
  }
};

const getUserbyemail = async (req, res) => {
  const email = req.params.email;
  // console.log(req.params.email);
  if (!email) {
    return res.status(401).json({ error: "email not found" });
  }
  try {
    const user = await User.findOne({ email }).select("-password");
    console.log(user);
    return res.status(201).json({ user: user, msg: "user login successs" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const userLogout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "Strict",
      secure: true,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error", error);
  }
};
module.exports = { signup, signin, getUserbyemail, userLogout };
