console.log("Starting the server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const fs = require('fs');
require("dotenv").config(); 

// Import route files
const emergencyRoutes = require("./routes/emergency");
const profileRouter = require("./routes/profile");
const authRoutes = require("./routes/auth");
const donateRoutes = require("./routes/donate");
const insertCases = require("./routes/insertcases");
const welfareRoutes = require("./routes/welfareRoutes");
const adminRoutes = require("./routes/adminRoutes");


// Remove the hardcoded URL and use environment variable instead
const url = process.env.MONGODB_URI;

console.log("Dependencies loaded...");

const app = express();

console.log("Initializing middleware...");

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded files (e.g., images)

console.log("Connecting to MongoDB...");

// MongoDB connection
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        console.log('Database Name:', mongoose.connection.name);
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Add error handler
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

console.log("Setting up routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donate", donateRoutes);
app.use("/api", profileRouter);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/welfare", (req, res, next) => {
    console.log(`Welfare API Request: ${req.method} ${req.url}`);
    next();
}, welfareRoutes);
app.use("/api/admin", adminRoutes);

// Add global error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start the server
const PORT = process.env.PORT || 5001;
console.log(`Attempting to start the server on port ${PORT}...`);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
