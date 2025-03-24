const mongoose = require("mongoose");

const WelfareOrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  profilePicture: { type: String, default: "" },  // Store URL of profile picture
  bio: { type: String, default: "" }, // Short intro or story
  socialLinks: {
    facebook: { type: String, default: "" }, 
    instagram: { type: String, default: "" }, 
  },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WelfareOrganization", WelfareOrganizationSchema);
