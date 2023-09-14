const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
});

const stateSchema = new mongoose.Schema({
  name: String,
  cities: [citySchema],
});

const countrySchema = new mongoose.Schema({
  name: String,
  states: [stateSchema],
});

Countries = new mongoose.model('Country', countrySchema);
module.exports = Countries;