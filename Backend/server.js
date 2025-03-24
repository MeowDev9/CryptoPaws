console.log("Starting the server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const fs = require('fs');
require("dotenv").config(); 


const emergencyRoutes = require("./routes/emergency");
const profileRouter = require("./routes/profile");
const authRoutes = require("./routes/auth");
const donateRoutes = require("./routes/donate");
const insertCases = require("./routes/insertcases");
const welfareRoutes = require("./routes/welfareRoutes");
const adminRoutes = require("./routes/adminRoutes");
const welfareProfileRoutes = require("./routes/dashboards/welfareProfileRoutes");




const url = process.env.MONGODB_URI;

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

console.log("Connecting to MongoDB...");


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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donate", donateRoutes);
app.use("/api/profile", profileRouter);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/welfare", (req, res, next) => {
    console.log(`Welfare API Request: ${req.method} ${req.url}`);
    next();
}, welfareRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/welfare", welfareProfileRoutes);

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
