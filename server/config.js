require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGOODB_URI: process.env.MONGOODB_URI,
    MODULES: {
        vehicleModule: process.env.MODULE_VEHICLE,
    },
};
