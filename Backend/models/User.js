const mongoose = require("mongoose");

// Define User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Hashed password
    createdAt: { type: Date, default: Date.now }
});

console.log("Hello")

// Export the User model
module.exports = mongoose.model("User", UserSchema);
