const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Emergency = require('../models/Emergency');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage });

// POST: Create a new emergency report
router.post("/", upload.array("images"), async (req, res) => {
    try {
        console.log('Received emergency report data:', req.body);
        
        const emergencyReport = new Emergency({
            name: req.body.name,
            phone: req.body.phone,
            location: req.body.location,
            description: req.body.description,
            images: req.files ? req.files.map(file => file.path) : []
        });

        console.log('Created emergency report object:', emergencyReport);

        const savedReport = await emergencyReport.save();
        console.log('Saved emergency report:', savedReport);

        res.status(200).json({ 
            message: "Emergency reported successfully",
            report: savedReport 
        });
    } catch (error) {
        console.error('Error saving emergency report:', error);
        res.status(500).json({ 
            message: "Failed to save emergency report", 
            error: error.message 
        });
    }
});

// GET: Retrieve all emergency reports
router.get("/", async (req, res) => {
    try {
        const reports = await Emergency.find({});
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reports", error: error.message });
    }
});

module.exports = router;
