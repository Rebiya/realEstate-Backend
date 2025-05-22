const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');

router.get('/users', userController.getAllUsers);
router.post('/users/register', userController.registerUser);
router.put('/users/:uuid', userController.updateUser);
router.delete('/users/:uuid', userController.deleteUser);

module.exports = router;