const Setting = require("../models/Settings");

const settingController = {
	// Get all settings data
	getAllSettings: async (req, res) => {
		try {
			const settings = await Setting.find({});
			res.json(settings);
		} catch (err) {
			console.error("Error retrieving vehicles:", err);
			res
				.status(500)
				.json({ message: "Error retrieving vehicles", error: err.message });
		}
	},

	// Update a specific setting by ID
	updateOrCreateSetting: async (req, res) => {
		try {
			const { id } = req.params; // Get the setting ID from the URL parameters
			const { phone, address, footerText } = req.body; // Get the fields to update from the request body

			// Try to find the setting by ID
			let setting = await Setting.findById(id);

			if (setting) {
				// If the setting exists, update it
				setting.phone = phone || setting.phone;
				setting.address = address || setting.address;
				setting.footerText = footerText || setting.footerText;
				await setting.save();
				return res.json({ message: "Setting updated successfully", setting });
			}
		} catch (err) {
			console.error("Error updating setting:", err);
			return res.status(500).json({
				message: "Error updating setting",
				error: err.message,
			});
		}
	},

	// POST request to create a new setting
	createSetting: async (req, res) => {
		try {
			const { phone, address, footerText } = req.body;
			const newSetting = new Setting({ phone, address, footerText });
			await newSetting.save();
			res
				.status(201)
				.json({
					message: "New setting created successfully",
					setting: newSetting,
				});
		} catch (err) {
			console.error("Error creating setting:", err);
			res
				.status(500)
				.json({ message: "Error creating setting", error: err.message });
		}
	},
};

module.exports = settingController;
