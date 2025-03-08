import fs from 'fs';
import path from 'path';

// Haversine formula to calculate distance between two coordinates in kilometers
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Helper function to load JSON data from file
function loadDataFromFile(filePath) {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// Find the closest locations for a source and destination
export async function getClosestLocations(source_type, source_name, destination_type, destination_name) {
  // Load the JSON files
  const airports = loadDataFromFile(path.resolve('/Users/nachiketpatil/Desktop/Divesh/CargoConnect/Backend/data/airports.json'));
  const cities = loadDataFromFile(path.resolve('/Users/nachiketpatil/Desktop/Divesh/CargoConnect/Backend/data/cities.json'));
  const seaports = loadDataFromFile(path.resolve('/Users/nachiketpatil/Desktop/Divesh/CargoConnect/Backend/data/seaports.json'));

  // Find the source and destination data
  const sourceData = await getLocationFromJson(source_type, source_name, airports, cities, seaports);
  const destinationData = await getLocationFromJson(destination_type, destination_name, airports, cities, seaports);

  if (!sourceData || !destinationData) {
    throw new Error('Source or destination not found.');
  }

  // Find closest airports, ports, and cities for source (excluding source itself)
  const sourceAirports = getClosestAirports(sourceData.latitude, sourceData.longitude, airports, sourceData.port_name);
  const sourcePorts = getClosestPorts(sourceData.latitude, sourceData.longitude, seaports, sourceData.port_name);
  const sourceCities = getClosestCities(sourceData.latitude, sourceData.longitude, cities, sourceData.city);

  // Find closest airports, ports, and cities for destination
  const destinationAirports = getClosestAirports(destinationData.latitude, destinationData.longitude, airports, destinationData.port_name);
  const destinationPorts = getClosestPorts(destinationData.latitude, destinationData.longitude, seaports, destinationData.port_name);
  const destinationCities = getClosestCities(destinationData.latitude, destinationData.longitude, cities, destinationData.city);

  return {
    source: {
      airports: sourceAirports,
      ports: sourcePorts,
      cities: sourceCities,
    },
    destination: {
      airports: destinationAirports,
      ports: destinationPorts,
      cities: destinationCities,
    },
  };
}

// Helper function to get location data from JSON based on type
async function getLocationFromJson(type, name, airports, cities, seaports) {
  let locationData;

  switch (type.toLowerCase()) {
    case 'airport':
      locationData = airports.find(airport => airport.port_name.toLowerCase() === name.toLowerCase());
      break;
    case 'port':
      locationData = seaports.find(port => port.port_name.toLowerCase() === name.toLowerCase());
      break;
    case 'city':
      locationData = cities.find(city => city.city.toLowerCase() === name.toLowerCase());
      break;
    default:
      throw new Error(`Invalid type: ${type}. Valid types are airport, port, or city.`);
  }

  // If location data is not found, throw an error
  if (!locationData) {
    throw new Error(`Location for ${name} of type ${type} not found.`);
  }

  // Return the location data with latitude and longitude
  return locationData;
}

// Helper function to get closest airports based on coordinates
function getClosestAirports(lat, lon, airports, sourceName) {
  return airports
    .map(airport => ({
      ...airport,
      distance: haversine(lat, lon, airport.latitude, airport.longitude),
    }))
    .filter(airport => airport.port_name.toLowerCase() !== sourceName.toLowerCase()) // Exclude source airport
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2); // Return the closest 2 airports
}

// Helper function to get closest ports based on coordinates
function getClosestPorts(lat, lon, seaports, sourceName) {
  return seaports
    .map(port => ({
      ...port,
      distance: haversine(lat, lon, port.latitude, port.longitude),
    }))
    .filter(port => port.port_name.toLowerCase() !== sourceName.toLowerCase()) // Exclude source port
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 1); // Return the closest 1 port
}

// Helper function to get closest cities based on coordinates
function getClosestCities(lat, lon, cities, sourceName) {
  return cities
    .map(city => ({
      ...city,
      distance: haversine(lat, lon, city.latitude, city.longitude),
    }))
    .filter(city => city.city.toLowerCase() !== sourceName.toLowerCase()) // Exclude source city
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 1); // Return the closest 1 city
}
