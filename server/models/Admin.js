const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  storePhoto: {
    type: String,
    default: "https://example.com/default-store-photo.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
