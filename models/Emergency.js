const mongoose = require("mongoose");

const EmergencySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});

const Emergency = mongoose.model("EmergencyReport", EmergencySchema);

module.exports = Emergency;
