//import favaourites service
const favoritesService = require("../services/favorites.services.js");

//create favorite
const createfavorite = async (req, res) => {
  try {
    const favorite = await favoritesService.createfavorite(req.body);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get favorites by user email
const getfavoritesByUserEmail = async (req, res) => {
  try {
    const favorites = await favoritesService.getfavoritesByUserEmail(req.params.user_email);
    if (!favorites) {
      return res.status(404).json({ message: "No favorites found for this user" });
    }
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//delete favorite
const deletefavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedfavorite = await favoritesService.deletefavorite(id);
    if (!deletedfavorite) {
      return res.status(404).json({ message: "favorite not found" });
    }
    res.status(200).json({ message: "residency removed from favorites successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//export all functions
module.exports = {
  createfavorite,
  getfavoritesByUserEmail,
  deletefavorite
};