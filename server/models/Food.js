const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  ambienceImage: {
    type: String,
    required: true,
  },
  gMapLocation: {
    type: String,
    required: true,
  },
  gMapLink: {
    type: String,
    required: true,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;