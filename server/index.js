const cors = require("cors");
const express = require("express");
const connectDb = require("./connectDb");
const path = require("path");
const { PORT, MODULES } = require("./config");

const registerRouteByModule = require("./utils/routeUtils");

const app = express();

connectDb();

// CORS
var corsOptions = {
	origin: "http://localhost:5173",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
	credentials: true, // Allow credentials
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Dynamically load modules' route based on configuration
registerRouteByModule(app, "Vehicle", "/api/vehicles", "Module Disabled");

app.get("*", (req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
	console.log(`Your server is running on port: ${PORT}`);
});
