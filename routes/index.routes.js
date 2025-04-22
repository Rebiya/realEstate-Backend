//import express
const express = require("express");
const router = express.Router();

//import routes
const migrateRoutes = require("./migrate.routes.js");
const userRoutes = require("./users.routes.js");
const residenciesRoutes = require("./residencies.routes.js");
const favoritesRoutes = require("./favorites.routes.js");


//use routes 
router.use(migrateRoutes);
router.use( userRoutes);
router.use(residenciesRoutes);
router.use(favoritesRoutes);

//export router
module.exports = router;