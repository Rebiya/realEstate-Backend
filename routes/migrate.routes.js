const express = require("express");
const router = express.Router();
const migrateController = require("../controllers/migrate.controller.js");

router.get("/migrate", migrateController.migrate);

module.exports = router;
