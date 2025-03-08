const mongoose = require("mongoose");
const neo4j = require("neo4j-driver");

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "CargoConnect_main", // <-- Replace with your database name
});

// Neo4j Connection
const neo4jDriver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

module.exports = { mongoose, neo4jDriver };
