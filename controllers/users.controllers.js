//import the user service
const userService = require('../services/users.services.js');

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "Error fetching users", error });
    }
  };

const registerUser = async (req, res) => {
    try {
      const user = await userService.registerUser(req.body);
      return res.status(201).json({ user });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ message: "Error registering user", error });
    }
  };
  //export the getAllUsers function
module.exports = {
    getAllUsers,
    registerUser
  };