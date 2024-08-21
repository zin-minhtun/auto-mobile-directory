const Vehicle = require("../models/Vehicles");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Directory for uploads
const uploadDir = path.join(__dirname, "../uploads");

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const vehicleController = {
    // Get all vehicles with filters and pagination
    getAllVehicles: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = "", filter = "all" } = req.query;

            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);

            const numericSearch = parseFloat(search);
            const isNumeric = !isNaN(numericSearch);

            const searchFilter = search ? {
                $or: [
                    { make: { $regex: search, $options: "i" } },
                    { model: { $regex: search, $options: "i" } },
                    { color: { $regex: search, $options: "i" } },
                    { transmission: { $regex: search, $options: "i" } },
                    { fuelType: { $regex: search, $options: "i" } },
                    ...(isNumeric ? [{ year: numericSearch }, { price: numericSearch }, { mileage: numericSearch }] : []),
                ],
            } : {};

            let filterCondition = {};
            if (filter === "sold") {
                filterCondition = { isSold: true };
            } else if (filter === "for_sale") {
                filterCondition = { isSold: false };
            }

            const queryFilter = { ...searchFilter, ...filterCondition };

            const vehicles = await Vehicle.find(queryFilter)
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum)
                .sort({ dateAdded: -1 });

            const totalVehicles = await Vehicle.countDocuments(queryFilter);

            res.json({
                vehicles,
                totalPages: Math.ceil(totalVehicles / limitNum),
            });
        } catch (err) {
            console.error("Error retrieving vehicles:", err);
            res.status(500).json({ message: "Error retrieving vehicles", error: err.message });
        }
    },

    // Get featured vehicles
    getFeaturedVehicles: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = "" } = req.query;

            const pageNum = parseInt(page, 10);
            const limitNum = parseInt(limit, 10);

            const numericSearch = parseFloat(search);
            const isNumeric = !isNaN(numericSearch);

            const searchFilter = search ? {
                $or: [
                    { make: { $regex: search, $options: "i" } },
                    { model: { $regex: search, $options: "i" } },
                    { color: { $regex: search, $options: "i" } },
                    { transmission: { $regex: search, $options: "i" } },
                    { fuelType: { $regex: search, $options: "i" } },
                    ...(isNumeric ? [{ year: numericSearch }, { price: numericSearch }, { mileage: numericSearch }] : []),
                ],
            } : {};

            let filterCondition = { isFeatured: true };

            const queryFilter = { ...searchFilter, ...filterCondition };

            const vehicles = await Vehicle.find(queryFilter)
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum)
                .sort({ dateAdded: -1 });

            const totalVehicles = await Vehicle.countDocuments(queryFilter);

            res.json({
                vehicles,
                totalPages: Math.ceil(totalVehicles / limitNum),
            });
        } catch (err) {
            console.error("Error retrieving featured vehicles:", err);
            res.status(500).json({ message: "Error retrieving featured vehicles", error: err.message });
        }
    },

    // Create a new vehicle with image upload
    createVehicle: async (req, res) => {
        const { make, model, year, price, cost, amount, mileage, color, transmission, fuelType, category, description, isConsigned } = req.body;

        let imagePath = null;

        if (req.file) {
            const filename = req.file.filename;
            const resizedImagePath = `uploads/resized_${filename}`;

            await sharp(req.file.path)
                .resize(300, 300)
                .toFile(resizedImagePath);

            imagePath = resizedImagePath;
        }

        const newVehicleData = {
            make, model, year, price, mileage, color, transmission, fuelType, category, description, image: imagePath, isConsigned,
        };

        if (isConsigned) {
            newVehicleData.cost = cost;
        } else {
            newVehicleData.amount = amount;
        }

        const newVehicle = new Vehicle(newVehicleData);

        try {
            const savedVehicle = await newVehicle.save();
            res.status(201).json(savedVehicle);
        } catch (err) {
            res.status(400).json({ message: "Error creating vehicle", error: err.message });
        }
    },

    // Update an existing vehicle with image upload
    updateVehicle: async (req, res) => {
        const { id } = req.params;
        const { make, model, year, price, cost, amount, mileage, color, transmission, fuelType, category, description, isConsigned } = req.body;

        const isConsignedBool = isConsigned === "true";

        try {
            const vehicle = await Vehicle.findById(id);
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }

            vehicle.make = make;
            vehicle.model = model;
            vehicle.year = year;
            vehicle.price = price;
            vehicle.mileage = mileage;
            vehicle.color = color;
            vehicle.transmission = transmission;
            vehicle.fuelType = fuelType;
            vehicle.category = category;
            vehicle.description = description;
            vehicle.isConsigned = isConsigned;

            if (isConsignedBool) {
                vehicle.amount = amount;
                vehicle.cost = null;
            } else {
                vehicle.cost = cost;
                vehicle.amount = null;
            }

            if (req.file) {
                const filename = req.file.filename;
                const resizedImagePath = `uploads/resized_${filename}`;

                await sharp(req.file.path)
                    .resize(300, 300)
                    .toFile(resizedImagePath);

                if (vehicle.image) {
                    fs.unlinkSync(vehicle.image);
                }

                vehicle.image = resizedImagePath;
            }

            const updatedVehicle = await vehicle.save();
            res.json(updatedVehicle);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            res.status(400).json({ message: "Error updating vehicle", error: err.message });
        }
    },

    // Update the isFeatured status of a vehicle
    updateFeaturedStatus: async (req, res) => {
        const { id } = req.params;
        const { isFeatured } = req.body;

        try {
            const vehicle = await Vehicle.findById(id);
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }

            vehicle.isFeatured = isFeatured;

            const updatedVehicle = await vehicle.save();
            res.json(updatedVehicle);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            res.status(400).json({ message: "Error updating vehicle", error: err.message });
        }
    },

    // Update the isSold status of a vehicle
    updateSoldStatus: async (req, res) => {
        const { id } = req.params;
        const { isSold } = req.body;

        try {
            const vehicle = await Vehicle.findById(id);
            if (!vehicle) {
                return res.status(404).json({ message: "Vehicle not found" });
            }

            vehicle.isSold = isSold;

            const updatedVehicle = await vehicle.save();
            res.json(updatedVehicle);
        } catch (err) {
            console.error("Error updating vehicle:", err);
            res.status(400).json({ message: "Error updating vehicle", error: err.message });
        }
    },

    // Bulk delete vehicles
    bulkDeleteVehicles: async (req, res) => {
        try {
            const { ids } = req.body;
            await Vehicle.deleteMany({ _id: { $in: ids } });
            res.json({ message: "Vehicles deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Error deleting vehicles", error: err.message });
        }
    },
};

module.exports = vehicleController;
