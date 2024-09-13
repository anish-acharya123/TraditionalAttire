const User = require("../models/User");
const Post = require("../models/Post");
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      path: "/",
    });

    res.status(200).json({ msg: "Success login", success: true });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Interser server error", error });
  }
};

const getUserbyemail = async (req, res) => {
  const email = req.params.email;

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

const likeproduct = async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;

  if (!id) {
    return res.status(401).json({ error: "id not found" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $addToSet: { likedItems: id },
      },
      { new: true }
    );
    res.status(200).json({ msg: "success", sucess: true });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

const wishproduct = async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(401).json({ error: "email not found" });
  }

  try {
    const userLikedItems = await User.findOne(
      { email },
      { likedItems: 1, _id: 0 }
    );

    if (userLikedItems && userLikedItems.likedItems.length > 0) {
      const likedProducts = await Post.find({
        _id: { $in: userLikedItems.likedItems },
      });

      return res
        .status(200)
        .json({ items: likedProducts, msg: "success retrive" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletewishhlist = async (req, res) => {
  const id = req.params.id;
  const email = req.params.email;
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { likedItems: id } },
      { new: true }
    );
    if (user) {
      res.status(200).json({ message: "Item removed from wishlist" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in deletewishlist:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const viewedproducts = async (req, res) => {
  const { id, email } = req.body;

  if (!id || !email) {
    return res.status(402).json({ error: "id and email not found" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let viewedItems = user.viewedItems || [];

    if (!viewedItems.includes(id)) {
      if (viewedItems.length === 10) {
        viewedItems.shift();
      }

      viewedItems.push(id);
    }

    user.viewedItems = viewedItems;
    await user.save();

    res.status(200).json({ msg: "success", success: true, viewedItems });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  signup,
  signin,
  getUserbyemail,
  userLogout,
  likeproduct,
  wishproduct,
  deletewishhlist,
  viewedproducts,
};
