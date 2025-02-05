console.log("Starting the server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import route files
const emergencyRoutes = require("./routes/emergency");
const profileRouter = require("./routes/profile");
const authRoutes = require("./routes/auth");
const donateRoutes = require("./routes/donate");
const insertCases = require("./routes/insertcases");


// MongoDB connection URL
const url = "mongodb+srv://Hatim9:Hatim123@cryptopaws.5bcvs.mongodb.net/?retryWrites=true&w=majority&appName=CryptoPaws";

console.log("Dependencies loaded...");

const app = express();

console.log("Initializing middleware...");

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files (e.g., images)

console.log("Connecting to MongoDB...");

// MongoDB connection
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log("MongoDB connected");

    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process if MongoDB connection fails
    });

console.log("Setting up routes...");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/donate", donateRoutes);
app.use("/api", profileRouter);
app.use("/api/emergency", emergencyRoutes);
// Emergency reporting routes



app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start the server
const PORT = 5000;
console.log(`Attempting to start the server on port ${PORT}...`);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
