require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGOODB_URI: process.env.MONGOODB_URI,
    MODULES: {
        Vehicle: process.env.MODULE_VEHICLE,
        Setting: process.env.MODULE_SETTING,
    },
};
