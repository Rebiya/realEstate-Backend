//import express and use router
const express = require('express');
const router = express.Router();
//import user controller
const userController = require('../controllers/users.controllers.js');

//write a route to get all users
router.get('/', userController.getAllUsers);
//register a new user
router.post('/register', userController.registerUser);

//export the router
module.exports = router;