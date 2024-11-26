const express = require("express");
const multer = require("multer");
const {
  createFood,
  getFoods,
  getFoodsbyCity,
  updateFood,
  deleteFood,
  getFoodById,
} = require("../controllers/foodController");
const router = express.Router();

const upload = multer();

router.post(
  "/food",
  upload.fields([
    { name: "foodImage", maxCount: 1 },
    { name: "ambienceImage", maxCount: 1 },
  ]),
  createFood
);
router.get("/food", getFoods);
router.get("/food/getFoodbyID/:id", getFoodById);
router.get("/food/:city", getFoodsbyCity);
router.put(
  "/food/:id",
  upload.fields([
    { name: "foodImage", maxCount: 1 },
    { name: "ambienceImage", maxCount: 1 },
  ]),
  updateFood
);
router.delete("/food/:id", deleteFood);

module.exports = router;
