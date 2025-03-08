const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    images: [{
        type: String  // Store paths to uploaded images
    }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Emergency", emergencySchema);
