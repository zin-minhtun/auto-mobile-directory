const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const vehicleController = require("../../controllers/vehicleController");

// Configure multer storage
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Specify the directory for saving uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname); // Use timestamp for unique filename
	},
});

// Initialize multer
const upload = multer({ storage });

// Define routes
router.get("/", vehicleController.getAllVehicles);
router.get("/featured-vehicles", vehicleController.getFeaturedVehicles);
router.post("/", upload.single("image"), vehicleController.createVehicle);
router.put("/:id", upload.single("image"), vehicleController.updateVehicle);
router.put("/:id/update-featured", vehicleController.updateFeaturedStatus);
router.put("/:id/update-sold", vehicleController.updateSoldStatus);
router.post("/bulk-delete", vehicleController.bulkDeleteVehicles);

module.exports = router;
