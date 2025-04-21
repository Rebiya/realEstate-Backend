//import express and use router
const express = require("express");
const router = express.Router();
//import residencies controller
const residenciesController = require("../controllers/residencies.controllers.js");

//crud operations for residencies
router.get("/residencies", residenciesController.getAllResidencies);
router.get("/residencies/:id", residenciesController.getResidencyById);
router.post("/residencies", residenciesController.createResidency);
router.put("/residencies/:id", residenciesController.updateResidency);
router.delete("/residencies/:id", residenciesController.deleteResidency);

//export router
module.exports = router;