//import express
const express = require("express");
const router = express.Router();

//import routes
const migrateRoutes = require("./migrate.routes.js");
const userRoutes = require("./users.routes.js");
const residenciesRoutes = require("./residencies.routes.js");


//use routes 
router.use(migrateRoutes);
router.use( userRoutes);
router.use(residenciesRoutes);

//export router
module.exports = router;