const express = require("express");
const WelfareOrganization = require("../models/WelfareOrganization");

const router = express.Router();

// Register a welfare organization
router.post("/register", async (req, res) => {
  try {
    const { 
      organizationName,
      email, 
      phone,
      address,
      description,
      website 
    } = req.body;
    
    console.log('Received registration request:', req.body);

    // Check if all required fields are present
    if (!organizationName || !email  || !phone || !address || !description || !website) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ['organizationName', 'email', 'phone', 'address','description','website']
      });S
    }

    // Check if the email is already registered
    const existingOrg = await WelfareOrganization.findOne({ email });

    if (existingOrg) {
      // If the existing organization is rejected, allow re-registration
      if (existingOrg.status === "rejected") {
        const newOrganization = new WelfareOrganization({
          organizationName,
          email,
          phone,
          address,
          description,
          website,
          status: "pending", // Set status to pending for the new registration
        });
        await newOrganization.save();
        return res.status(201).json({ 
          message: "Registration request submitted successfully!", 
          organization: newOrganization 
        });
      } else {
        // If the existing organization is not rejected, block the new registration
        return res.status(400).json({ message: "Organization already registered!" });
      }
    }

    // If no existing organization, create a new one
    const newOrganization = new WelfareOrganization({
      organizationName,
      email,
      phone,
      address,
      description,
      website,
      status: "pending", // Default status for new registrations
    });

    await newOrganization.save();

    res.status(201).json({ 
      message: "Registration request submitted successfully!", 
      organization: newOrganization 
    });
  } catch (error) {
    console.error('Welfare registration error:', error);
    res.status(500).json({ 
      message: "Server error during registration", 
      error: error.message 
    });
  }
});

module.exports = router;