const fs = require('fs');
const mongoose = require('mongoose');
const Airport = require('./models/airport.model');
const Seaport = require('./models/port.model');
const City = require('./models/city.model');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
    dbName: "CargoConnect_main",
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 60000,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

async function convertLocations(locations) {
    return locations
        .map(location => {
            if (!location.longitude || !location.latitude || isNaN(location.longitude) || isNaN(location.latitude)) {
                console.warn(`⚠ Skipping invalid entry: ${JSON.stringify(location)}`);
                return null;
            }
            return {
                id: location.id,
                port_name: location.port_name,
                port_code: location.port_code,
                city: location.city,
                country_name: location.country_name,
                country_iso2: location.country_iso2,
                type: location.type,
                location: {
                    type: "Point",
                    coordinates: [parseFloat(location.longitude), parseFloat(location.latitude)]
                }
            };
        })
        .filter(Boolean);
}

async function saveToDatabase(model, data, name) {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error(`❌ MongoDB is not connected. Skipping ${name} data insertion.`);
            return;
        }
        if (data.length === 0) {
            console.warn(`⚠ No valid ${name} data found. Skipping.`);
            return;
        }
        await model.deleteMany({});
        const batchSize = 500;
        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            await model.insertMany(batch, { ordered: false });
            console.log(`✅ Inserted batch ${i / batchSize + 1} for ${name}`);
        }
        console.log(`✅ ${name} data successfully saved to MongoDB`);
    } catch (err) {
        console.error(`❌ Error saving ${name} data:`, err);
    }
}

function readFromFile(inputFilename, model, name) {
    fs.readFile(inputFilename, 'utf8', async (err, data) => {
        if (err) {
            console.error(`Error reading file ${inputFilename}: ${err}`);
            return;
        }
        try {
            const locations = JSON.parse(data);
            const convertedLocations = await convertLocations(locations);
            await saveToDatabase(model, convertedLocations, name);
        } catch (parseErr) {
            console.error(`Error parsing JSON from ${inputFilename}: ${parseErr}`);
        }
    });
}

async function fetchAndConvertCities() {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.error("❌ MongoDB is not connected. Skipping Cities data insertion.");
            return;
        }
        const cities = await City.find({});
        const convertedCities = await convertLocations(cities);
        await saveToDatabase(City, convertedCities, 'Cities');
    } catch (err) {
        console.error("❌ Error fetching or saving Cities data:", err);
    }
}

// Ensure MongoDB is connected before processing data
mongoose.connection.once("open", () => {
    readFromFile('airports.json', Airport, 'Airports');
    readFromFile('seaports.json', Seaport, 'Seaports');
    fetchAndConvertCities();
});
