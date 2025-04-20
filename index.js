// Import required modules
const express = require("express");
require("dotenv").config();
const query = require("./DB/dbconfig.js");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer"); 

// Create an Express application
const app = express();

// Allow all origins and handle preflight requests
const corsOptions = {
  origin: "*", 
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow all HTTP methods
  preflightContinue: false, // Disable preflight caching
  optionsSuccessStatus: 204, // Return 204 for preflight requests
};

// Apply middleware
app.use(cors(corsOptions)); // Apply CORS with the updated configuration
app.use(express.json());
app.use(expressSanitizer()); // Fix: Correct sanitizer middleware

// Import and use routes
const router = require("./routes/index.js");
app.use("/api", router);

// Set port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export for testing
module.exports = app;