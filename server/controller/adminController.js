// controllers/adminController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Post = require("../models/Post");
const cloudinary = require("../config/cloudinaryConfig");

const adminSignup = async (req, res) => {
  const { brandName, phoneNumber, email, password, address } = req.body;

  try {
    // Upload storePhoto to Cloudinary if provided
    let storePhotoUrl = null;

    if (req.file) {
      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "store_photos",
              use_filename: true,
              unique_filename: false,
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer); // Send the file buffer to the stream
        });
      };

      const result = await uploadToCloudinary();
      storePhotoUrl = result.secure_url; // Store the Cloudinary URL
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Admin with hashed password and Cloudinary URL (if uploaded)
    const newAdmin = new Admin({
      brandName,
      phoneNumber,
      address,
      storePhoto: storePhotoUrl,
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();
    res.status(200).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const payload = {
      email: admin.email,
      name: admin.brandName,
      phone: admin.phoneNumber,
      address: admin.address,
      // email: admin.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("admintoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      path: "/",
      // SameSite: "None",
    });

    res.status(200).json({ msg: "Login successful", success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const adminproductadd = async (req, res) => {
  // console.log(req.body);
  const {
    category,
    price,
    gender,
    type,
    description,
    size,
    availableCount,
    images,
    name,
    phone,
    storeLocation,
    email,
  } = req.body;

  try {
    const newProduct = new Post({
      category,
      price,
      gender,
      type,
      description,
      size,
      availableCount,
      images,
      name,
      phone,
      storeLocation,
      email,
    });

    // Save product to the database
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product" });
  }
};

const adminlogout = async (req, res) => {
  try {
    res.cookie("admintoken", "", {
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
module.exports = { adminSignup, adminSignin, adminproductadd, adminlogout };
