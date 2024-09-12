const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Map, // Map for storing price based on size
      of: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: [String], // Array for storing multiple sizes
      required: true,
    },
    availableCount: {
      type: Map, // Map to track count per size
      of: Number,
      required: true,
    },
    images: {
      type: [String], // Array for multiple images
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    // profilePic: {
    //   type: String,
    //   required: true,
    // },
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalRating: {
      type: Number, // Total number of ratings received
      default: 0,
    },
    storeLocation: {
      address: { type: String, required: true }, // Store address for rentals
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
