const express = require("express");
const router = express.Router();

// Base rates for different transportation modes (per km, per kg)
const RATES = {
  air: 0.85,
  sea: 0.25,
  road: 0.45,
  rail: 0.35,
};

// Fuel surcharges (percentage)
const FUEL_SURCHARGE = {
  air: 15,
  sea: 8,
  road: 12,
  rail: 6,
};

// Calculate freight cost
router.post("/calculate", async (req, res) => {
  try {
    const {
      distance, // in km
      weight, // in kg
      transportationMode, // "air", "sea", "road", "rail"
      priority, // "standard", "express", "economy"
      hasDangerousGoods,
      isRefrigerated,
      isOversized,
    } = req.body;

    if (!distance || !weight || !transportationMode) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    // Base calculation
    let baseCost = distance * weight * RATES[transportationMode];

    // Apply fuel surcharge
    const fuelSurcharge = baseCost * (FUEL_SURCHARGE[transportationMode] / 100);

    // Apply priority multipliers
    let priorityMultiplier = 1;
    if (priority === "express") priorityMultiplier = 1.5;
    if (priority === "economy") priorityMultiplier = 0.8;

    // Additional charges
    const dangerousGoodsCharge = hasDangerousGoods ? baseCost * 0.25 : 0;
    const refrigerationCharge = isRefrigerated ? baseCost * 0.15 : 0;
    const oversizeCharge = isOversized ? baseCost * 0.2 : 0;

    // Calculate total cost
    const totalCost =
      (baseCost + fuelSurcharge) * priorityMultiplier +
      dangerousGoodsCharge +
      refrigerationCharge +
      oversizeCharge;

    // Return detailed breakdown
    res.status(200).json({
      baseCost: parseFloat(baseCost.toFixed(2)),
      fuelSurcharge: parseFloat(fuelSurcharge.toFixed(2)),
      priorityAdjustment: parseFloat(
        (baseCost * (priorityMultiplier - 1)).toFixed(2)
      ),
      additionalCharges: {
        dangerousGoods: parseFloat(dangerousGoodsCharge.toFixed(2)),
        refrigeration: parseFloat(refrigerationCharge.toFixed(2)),
        oversize: parseFloat(oversizeCharge.toFixed(2)),
      },
      totalCost: parseFloat(totalCost.toFixed(2)),
      currency: "USD",
      estimatedTime: calculateEstimatedTime(
        distance,
        transportationMode,
        priority
      ),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get shipping rates
router.get("/rates", (req, res) => {
  res.status(200).json({
    baseRates: RATES,
    fuelSurcharges: FUEL_SURCHARGE,
    priorityMultipliers: {
      standard: 1,
      express: 1.5,
      economy: 0.8,
    },
    additionalCharges: {
      dangerousGoods: "25% of base cost",
      refrigerated: "15% of base cost",
      oversized: "20% of base cost",
    },
  });
});

// Helper function to calculate estimated delivery time
function calculateEstimatedTime(distance, mode, priority) {
  const speeds = {
    air: 800, // km per day
    sea: 500, // km per day
    road: 600, // km per day
    rail: 700, // km per day
  };

  const priorityFactors = {
    express: 0.7,
    standard: 1,
    economy: 1.3,
  };

  const days =
    (distance / speeds[mode]) * priorityFactors[priority || "standard"];
  return {
    days: Math.ceil(days),
    hours: Math.ceil(days * 24),
  };
}

module.exports = router;
