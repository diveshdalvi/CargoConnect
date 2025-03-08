const mongoose = require("mongoose");
const Airport = require("../models/airport.model");
const City = require("../models/city.model");

// ✅ Haversine Formula to calculate distance between two points
const haversine = (lat1, lon1, lat2, lon2) => {
  const toRad = (angle) => (angle * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ✅ Function to find the closest Airports, Ports, and Cities
const findClosestPoints = async (type, name) => {
  let model;
  let collectionName;

  // ✅ Map the Type with Collection Name
  if (type === "Airport") model = Airport;
  if (type === "City") model = City;
  if (type === "Port") collectionName = "seaports";

  // ✅ Step 1: Find Origin Point
  let origin;
  if (type === "Port") {
    origin = await mongoose.connection.db.collection("seaports").findOne({
      $or: [
        { port_name: { $regex: new RegExp(name, "i") } },
        { city: { $regex: new RegExp(name, "i") } },
      ],
    });
  } else {
    origin = await model.findOne({
      $or: [
        { port_name: { $regex: new RegExp(name, "i") } },
        { city: { $regex: new RegExp(name, "i") } },
      ],
    });
  }

  if (!origin) throw new Error(`No ${type} found with name "${name}"`);

  // ✅ Step 2: Find Closest Airports
  const closestAirports = await Airport.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [origin.longitude, origin.latitude],
        },
        $maxDistance: 3000000,
      },
    },
  }).limit(2);

  // ✅ Step 3: Find Closest Port using $geoNear
  const closestPort = await mongoose.connection.db.collection("seaports").aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [origin.longitude, origin.latitude],
        },
        distanceField: "distance",
        maxDistance: 3000000,
        spherical: true,
      },
    },
    { $limit: 1 },
  ]).toArray();

  // ✅ Step 4: Find Closest City
  const closestCity = await City.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [origin.longitude, origin.latitude],
        },
        $maxDistance: 3000000,
      },
    },
  }).limit(1);

  return {
    origin: origin,
    closestAirports: closestAirports,
    closestPort: closestPort.length > 0 ? closestPort[0] : null,
    closestCity: closestCity.length > 0 ? closestCity[0] : null,
  };
};

// ✅ Function to Generate All Possible Routes
const generateRoutes = (source, destination) => {
  const routes = [];

  // ✅ Direct Air Route
  source.closestAirports.forEach((srcAirport) => {
    destination.closestAirports.forEach((destAirport) => {
      routes.push({
        route: [srcAirport, destAirport],
        mode: "Air",
      });
    });
  });

  // ✅ Direct Sea Route
  if (source.closestPort && destination.closestPort) {
    routes.push({
      route: [source.closestPort, destination.closestPort],
      mode: "Sea",
    });
  }

  // ✅ Port -> Port -> Airport
  if (source.closestPort && destination.closestPort) {
    routes.push({
      route: [
        source.closestPort,
        destination.closestPort,
        destination.closestAirports[0],
      ],
      mode: "Sea + Air",
    });
  }

  // ✅ City -> City (Land)
  if (source.closestCity && destination.closestCity) {
    routes.push({
      route: [source.closestCity, destination.closestCity],
      mode: "Land",
    });
  }

  return routes;
};

// ✅ Main Function
const findRoutes = async (originType, originName, destinationType, destinationName) => {
  const source = await findClosestPoints(originType, originName);
  const destination = await findClosestPoints(destinationType, destinationName);

  const routes = generateRoutes(source, destination);

  return {
    source: source.origin,
    destination: destination.origin,
    possibleRoutes: routes,
  };
};

module.exports = { findRoutes };
