const express = require("express");
const path = require("path");
const router = express.Router();

const settingController = require("../../controllers/settingController");

// Define routes
router.get("/", settingController.getAllSettings);
router.post("/", settingController.createSetting);
router.put("/:id", settingController.updateOrCreateSetting);

module.exports = router;
