const mongoose = require("mongoose");

const WelfareOrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("WelfareOrganization", WelfareOrganizationSchema);
