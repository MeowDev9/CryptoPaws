const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

console.log(User);

const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;

// Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {

        console.error("Error during signup:", error);

        res.status(500).json({ message: "Server error" });
    }
});


router.post("/signin", async (req, res) => {
    const { email, password, role } = req.body;  // Accept role from frontend

    if (!email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let user;
        let userRole;

        if (role === "donor") {
            user = await User.findOne({ email });
            userRole = "donor";
        } else if (role === "welfare") {
            user = await WelfareOrganization.findOne({ email });
            userRole = "welfare";
        }

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT with correct role
        const token = jwt.sign({ id: user._id, role: userRole }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Signin successful", token, role: userRole });
    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});






module.exports = router;
