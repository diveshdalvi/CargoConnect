import express from "express";
import { getClosestLocations } from "../utils/util.js"; // Import the function from routeUtils.js

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

<<<<<<< HEAD
// GET API to find routes with query params
router.get("/find", async (req, res) => {
  const { originType, originName, destinationType, destinationName } =
    req.query;

  if (!originType || !originName || !destinationType || !destinationName) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

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

// POST API to find optimized routes with more parameters
router.post("/optimize", async (req, res) => {
  const {
    originType,
    originName,
    destinationType,
    destinationName,
    optimizationCriteria, // "cost", "time", "emissions", "reliability"
    transportModes, // array of allowed modes ["air", "sea", "road", "rail"]
    maxTransfers, // maximum number of transfers allowed
    departureDate, // for seasonal routes consideration
  } = req.body;

  if (!originType || !originName || !destinationType || !destinationName) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    // Call the existing findRoutes function for now
    // In a real implementation, you would enhance this with the additional parameters
    const baseRoutes = await findRoutes(
      originType,
      originName,
      destinationType,
      destinationName
    );

    // Mock optimization based on criteria
    let optimizedRoutes = [...baseRoutes];

    // Sort based on optimization criteria
    if (optimizationCriteria === "cost") {
      optimizedRoutes.sort((a, b) => a.estimatedCost - b.estimatedCost);
    } else if (optimizationCriteria === "time") {
      optimizedRoutes.sort((a, b) => a.estimatedTime - b.estimatedTime);
    } else if (optimizationCriteria === "emissions") {
      optimizedRoutes.sort(
        (a, b) => a.estimatedEmissions - b.estimatedEmissions
      );
    } else if (optimizationCriteria === "reliability") {
      optimizedRoutes.sort((a, b) => b.reliability - a.reliability);
    }

    // Filter by transport modes if specified
    if (transportModes && transportModes.length > 0) {
      optimizedRoutes = optimizedRoutes.filter((route) =>
        route.segments.every((segment) => transportModes.includes(segment.mode))
      );
    }

    // Filter by max transfers if specified
    if (maxTransfers !== undefined) {
      optimizedRoutes = optimizedRoutes.filter(
        (route) => route.segments.length - 1 <= maxTransfers
      );
    }

    res.status(200).json({
      routes: optimizedRoutes,
      optimizedFor: optimizationCriteria || "balanced",
      filteredBy: {
        transportModes: transportModes || "all",
        maxTransfers: maxTransfers !== undefined ? maxTransfers : "unlimited",
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET recent popular routes (mock data for now)
router.get("/popular", (req, res) => {
  const popularRoutes = [
    {
      origin: "Shanghai, China",
      destination: "Rotterdam, Netherlands",
      transportMode: "sea",
      popularity: 95,
    },
    {
      origin: "Hong Kong",
      destination: "Los Angeles, USA",
      transportMode: "sea",
      popularity: 92,
    },
    {
      origin: "Dubai, UAE",
      destination: "London, UK",
      transportMode: "air",
      popularity: 88,
    },
    {
      origin: "Singapore",
      destination: "Hamburg, Germany",
      transportMode: "sea",
      popularity: 85,
    },
    {
      origin: "New York, USA",
      destination: "Frankfurt, Germany",
      transportMode: "air",
      popularity: 82,
    },
  ];

  res.status(200).json(popularRoutes);
});

module.exports = router;
export default router;

