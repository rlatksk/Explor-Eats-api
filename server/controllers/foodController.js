const Food = require("../models/Food");
const { uploadFile } = require("../services/googleCloudStorage");

// Create a food
async function createFood(req, res) {
  try {
    const { name, description, city, location, gMapLocation } = req.body;
    const foodImageFile = req.files.foodImage ? req.files.foodImage[0] : null;
    const ambienceImageFile = req.files.ambienceImage
      ? req.files.ambienceImage[0]
      : null;

    if (!foodImageFile || !ambienceImageFile) {
      return res
        .status(400)
        .json({ error: "Food image or ambience image is missing" });
    }

    const foodImageUrl = await uploadFile(foodImageFile);
    const ambienceImageUrl = await uploadFile(ambienceImageFile);

    const newFood = new Food({
      name,
      description,
      city,
      location,
      foodImage: foodImageUrl,
      ambienceImage: ambienceImageUrl,
      gMapLocation,
      gMapLink,
    });

    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all foods
async function getFoods(req, res) {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a food by city
async function getFoodsbyCity(req, res) {
  try {
    const { city } = req.params;
    const foods = await Food.find({ city });
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a Food
async function updateFood(req, res) {
  try {
    const { id } = req.params;
    const { name, description, city, location, gMapLocation, gMapLink } =
      req.body;
    const foodImageFile = req.files.foodImage ? req.files.foodImage[0] : null;
    const ambienceImageFile = req.files.ambienceImage
      ? req.files.ambienceImage[0]
      : null;

    const foodImageUrl = foodImageFile
      ? await uploadFile(foodImageFile)
      : undefined;
    const ambienceImageUrl = ambienceImageFile
      ? await uploadFile(ambienceImageFile)
      : undefined;

    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        name,
        description,
        city,
        location,
        foodImage: foodImageUrl || undefined,
        ambienceImage: ambienceImageUrl || undefined,
        gMapLocation,
        gMapLink,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a Food
async function deleteFood(req, res) {
  try {
    const { id } = req.params;
    const deleteFood = await Food.findByIdAndDelete(id);

    if (!deleteFood) {
      return res.status(404).json({ error: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFoodById(req, res) {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createFood,
  getFoods,
  getFoodsbyCity,
  updateFood,
  deleteFood,
  getFoodById,
};
