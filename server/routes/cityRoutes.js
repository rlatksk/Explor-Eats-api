const express = require("express");
const {
  createCity,
  getCity,
  updateCity,
  deleteCity,
  getCityByName
} = require("../controllers/cityController");
const router = express.Router();


router.post("/city", createCity);
router.get("/city", getCity);
router.get("/city/:city", getCityByName);
router.put("/city/:id", updateCity);
router.delete("/city/:id", deleteCity);

module.exports = router;
