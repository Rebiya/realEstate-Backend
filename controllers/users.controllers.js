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

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userService.updateUser(userId, req.body);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await userService.deleteUser(userId);
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Error deleting user", error });
    }
};

//export the getAllUsers function
module.exports = {
    getAllUsers,
    registerUser,
    updateUser,
    deleteUser
  };