const express = require("express");
const { getClosestLocations } = require("../utils/util.js");

const router = express.Router();

// POST API to find closest locations
router.post("/getClosestLocations", async (req, res) => {
  const { source_type, source_name, destination_type, destination_name } = req.body;

  // Validate that all required fields are provided
  if (!source_type || !source_name || !destination_type || !destination_name) {
    return res.status(400).json({
      error: "Missing required fields: source_type, source_name, destination_type, destination_name",
    });
  }

  try {
    const result = await getClosestLocations(
      source_type,
      source_name,
      destination_type,
      destination_name
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;