const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const WelfareOrganization = require("../models/WelfareOrganization");

const router = express.Router();

// Welfare Registration Route
router.post("/register", async (req, res) => {
  try {
    const { organizationName, email, password, phone, address, description, website } = req.body;
    console.log('Received registration request:', req.body);

    if (!organizationName || !email || !password || !phone || !address || !description || !website) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ['organizationName', 'email', 'password', 'phone', 'address', 'description', 'website']
      });
    }

    let welfare = await WelfareOrganization.findOne({ email });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    if (welfare) {
      if (welfare.status === "rejected") {
        // Update existing rejected welfare with new hashed password
        welfare.organizationName = organizationName;
        welfare.password = hashedPassword;
        welfare.phone = phone;
        welfare.address = address;
        welfare.description = description;
        welfare.website = website;
        welfare.status = "pending";

        await welfare.save();
        return res.status(201).json({ message: "Registration request submitted successfully!" });
      } else {
        return res.status(400).json({ message: "Organization already registered!" });
      }
    }

    // Create new welfare entry
    welfare = new WelfareOrganization({
      organizationName,
      email,
      password: hashedPassword,
      phone,
      address,
      description,
      website,
      status: "pending",
    });

    await welfare.save();
    res.status(201).json({ message: "Registration request submitted successfully!", organization: welfare });
  } catch (error) {
    console.error('Welfare registration error:', error);
    res.status(500).json({ message: "Server error during registration", error: error.message });
  }
});

// Welfare Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const welfare = await WelfareOrganization.findOne({ email });
    if (!welfare) {
      return res.status(404).json({ message: "Welfare organization not found" });
    }

    if (welfare.status !== "approved") {
      return res.status(403).json({ message: "Your account is not approved yet." });
    }

    const isMatch = await bcrypt.compare(password, welfare.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: welfare._id, role: "welfare" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Welfare login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
