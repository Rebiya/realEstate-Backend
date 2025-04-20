//import express
const express = require("express");
const router = express.Router();

//import routes
const migrateRoutes = require("./migrate.routes.js");



//use routes of migrate
router.use(migrateRoutes);

//export router
module.exports = router;