const express = require("express");
const { findRoutes } = require("../utils/routeUtils.js");

const router = express.Router();

// POST API to find routes
router.post("/find", async (req, res) => {
  const { originType, originName, destinationType, destinationName } = req.body;

  try {
    const response = await findRoutes(
      originType,
      originName,
      destinationType,
      destinationName
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
