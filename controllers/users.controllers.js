const userService = require('../services/users.services');

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ 
        message: error.message || 'Failed to fetch users',
        error: error 
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      const user = await userService.registerUser(req.body);
      res.status(201).json({ 
        message: 'User registered successfully',
        user 
      });
    } catch (error) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Error registering user',
        error: error 
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { uuid } = req.params;
      const result = await userService.updateUser(uuid, req.body);
      res.status(200).json({ 
        message: 'User updated successfully',
        user: result 
      });
    } catch (error) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Error updating user',
        error: error 
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { uuid } = req.params;
      await userService.deleteUser(uuid);
      res.status(200).json({ 
        message: 'User deleted successfully' 
      });
    } catch (error) {
      res.status(error.status || 500).json({ 
        message: error.message || 'Error deleting user',
        error: error 
      });
    }
  }
};