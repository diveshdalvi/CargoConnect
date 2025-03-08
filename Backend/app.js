require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { neo4jDriver } = require("./config/database");
const route = require("./routes/pathRoute");

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

// neo4jDriver
//   .verifyConnectivity()
//   .then(() => console.log("✅ Neo4j connected"))
//   .catch((err) => console.error("❌ Neo4j connection error:", err));

// Middleware
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.use("/api/routes", route);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
