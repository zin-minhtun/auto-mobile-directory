const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Setting schema
const SettingSchema = new Schema({
	phone: {
		type: String,
		required: true,
	},
    address: {
		type: String,
		required: true,
	},
    footerText: {
		type: String,
		required: true,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

// Create the Setting model
const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;
