const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Vehicle schema
const VehicleSchema = new Schema({
	make: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	cost: {
		type: Number,
		default: null,
	},
	amount: {
		type: Number,
		default: null,
	},
	mileage: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: false,
	},
	transmission: {
		type: String,
		required: true,
	},
	fuelType: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ["Sedan", "Hatchback", "SUV", "Coupe", "Van", "Minivan", "Truck"],
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	image: {
		type: String,
		required: false,
	},
	isSold: {
		type: Boolean,
		default: false,
	},
	isFeatured: {
		type: Boolean,
		default: false,
	},
	isConsigned: {
		type: Boolean,
		default: false,
	},
	dateAdded: {
		type: Date,
		default: Date.now,
	},
});

// Create the Vehicle model
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;
