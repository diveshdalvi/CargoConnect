const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema({
  port_name: String,
  port_code: String,
  city: String,
  country_name: String,
  country_iso2: String,
  latitude: Number,
  longitude: Number,
  type: String,
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
    },
  },
});

AirportSchema.pre("save", function (next) {
  this.location.coordinates = [this.longitude, this.latitude];
  next();
});

module.exports = mongoose.model("Airport", AirportSchema, "airports");
