const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

// Get all users
router.get('/users', userController.getAllUsers);

// Register a new user
router.post('/users/register', userController.registerUser);

// Update a user
router.put('/users/:userId', userController.updateUser);

// Delete a user
router.delete('/users/:userId', userController.deleteUser);

module.exports = router; 