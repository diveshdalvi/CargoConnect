const express = require("express");
const mongoose = require("mongoose");
const Airport = require("../models/airport.model");
const City = require("../models/city.model");

const router = express.Router();

// GET all airports
router.get("/airports", async (req, res) => {
  try {
    const airports = await Airport.find({});
    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET airport by ID
router.get("/airports/:id", async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);
    if (!airport) {
      return res.status(404).json({ error: "Airport not found" });
    }
    res.status(200).json(airport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search airports by name or code
router.get("/airports/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const airports = await Airport.find({
      $or: [
        { port_name: { $regex: new RegExp(query, "i") } },
        { port_code: { $regex: new RegExp(query, "i") } },
        { city: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(10);
    res.status(200).json(airports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all cities
router.get("/cities", async (req, res) => {
  try {
    const cities = await City.find({});
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET city by ID
router.get("/cities/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search cities by name
router.get("/cities/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const cities = await City.find({
      $or: [
        { city: { $regex: new RegExp(query, "i") } },
        { country_name: { $regex: new RegExp(query, "i") } },
      ],
    }).limit(10);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all ports
router.get("/ports", async (req, res) => {
  try {
    const ports = await mongoose.connection.db
      .collection("seaports")
      .find({})
      .toArray();
    res.status(200).json(ports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search ports by name or code
router.get("/ports/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const ports = await mongoose.connection.db
      .collection("seaports")
      .find({
        $or: [
          { port_name: { $regex: new RegExp(query, "i") } },
          { port_code: { $regex: new RegExp(query, "i") } },
          { city: { $regex: new RegExp(query, "i") } },
        ],
      })
      .limit(10)
      .toArray();
    res.status(200).json(ports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
