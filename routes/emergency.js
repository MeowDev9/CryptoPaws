const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Emergency = require("../models/Emergency");

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
router.post("/", upload.single("images"), async (req, res) => {
    try {
        const { name, phone, location, description } = req.body;

        // Handle file upload
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const report = new Emergency({ name, phone, location, description, imageUrl });
        await report.save();

        res.status(201).json({ message: "Emergency report submitted successfully", report });
    } catch (error) {
        console.error("Error saving report:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

// GET: Retrieve all emergency reports
router.get("/", async (req, res) => {
    try {
        const reports = await Emergency.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});

module.exports = router;
