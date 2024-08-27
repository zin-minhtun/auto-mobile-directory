const { MODULES } = require("../config");

// Utility function to register routes
const registerRouteByModule = (app, moduleName, routePath, defaultResponse) => {
    if (MODULES[moduleName]) {
        const moduleRoutes = require(`../modules/${moduleName}/routes`);
        app.use(routePath, moduleRoutes);
    } else {
        app.use(routePath, (req, res) => {
            res.json(defaultResponse);
        });
    }
};

module.exports = registerRouteByModule;