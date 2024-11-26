const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  peopleDescription: {
    type: String,
    required: true,
  },
  cultureDescription: {
    type: String,
    required: true,
  },
  culinaryDescription: {
    type: String,
    required: true,
  }
});

const City = mongoose.model('City', citySchema);

module.exports = City;