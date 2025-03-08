require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { neo4jDriver } = require("./config/database");
const pathRoute = require("./routes/pathRoute");
const locationRoutes = require("./routes/locationRoutes");
const freightRoutes = require("./routes/freightRoutes");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Database connections
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "CargoConnect_main", // ✅ Ensure you specify the database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Wait for the connection to open and then query the database
mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB connection is now open");
});

neo4jDriver
  .verifyConnectivity()
  .then(() => console.log("✅ Neo4j connected"))
  .catch((err) => console.error("❌ Neo4j connection error:", err));

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// API Routes
app.use("/api/routes", pathRoute);
app.use("/api/locations", locationRoutes);
app.use("/api/freight", freightRoutes);

// Root route for API health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "CargoConnect API is running",
    version: "1.0.0",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
