const Location = require("../models/City");

// Create a new location
async function createCity(req, res) {
  try {
    const { city, peopleDescription, cultureDescription, culinaryDescription } = req.body;

    const newLocation = new Location({
      city,
      peopleDescription,
      cultureDescription,
      culinaryDescription,
    });

    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all locations
async function getCity(req, res) {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCityByName(req, res) {
  try {
    const { city } = req.params;
    const location = await Location.findOne({ city });
    if (!location) {
      return res.status(404).json({ error: "City not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a location
async function updateCity(req, res) {
  try {
    const { id } = req.params;
    const { city, peopleDescription, cultureDescription, culinaryDescription } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { city, peopleDescription, cultureDescription, culinaryDescription },
      { new: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a location
async function deleteCity(req, res) {
  try {
    const { id } = req.params;
    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCity,
  getCity,
  updateCity,
  deleteCity,
  getCityByName
};
