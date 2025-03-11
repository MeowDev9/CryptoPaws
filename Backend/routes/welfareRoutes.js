const express = require("express");
const WelfareOrganization = require("../models/WelfareOrganization");

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { 
      organizationName,
      email,
      password, 
      phone,
      address,
      description,
      website 
    } = req.body;
    
    console.log('Received registration request:', req.body);

  
    if (!organizationName || !email || !password || !phone || !address || !description || !website) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ['organizationName', 'email', 'password', 'phone', 'address','description','website']
      });S
    }

  
    const existingOrg = await WelfareOrganization.findOne({ email });

    if (existingOrg) {
    
      if (existingOrg.status === "rejected") {
        const newOrganization = new WelfareOrganization({
          organizationName,
          email,
          password,
          phone,
          address,
          description,
          website,
          status: "pending", 
        });
        await newOrganization.save();
        return res.status(201).json({ 
          message: "Registration request submitted successfully!", 
          organization: newOrganization 
        });
      } else {
        
        return res.status(400).json({ message: "Organization already registered!" });
      }
    }


    const newOrganization = new WelfareOrganization({
      organizationName,
      email,
      password,
      phone,
      address,
      description,
      website,
      status: "pending",
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