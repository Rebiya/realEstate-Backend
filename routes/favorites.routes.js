//import express and routes
const express = require("express");
const router = express.Router();
//import favorites controller
const favoritesController = require("../controllers/favorites.controllers.js");
  
//crud operations for favorites
router.post("/favorites", favoritesController.createfavorite);
router.get("/favorites/:user_email", favoritesController.getfavoritesByUserEmail);
router.delete("/favorites/:id", favoritesController.deletefavorite);

//export router
module.exports = router;