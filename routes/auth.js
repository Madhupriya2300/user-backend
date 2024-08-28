const express = require('express');
const router = express.Router();

const { Authorization } = require('../middleware/authorization'); 

const {
    signup,
    login,
    getUsers
} = require('../controllers/authController');

router.post('/signup', signup);

router.post('/login', login);

router.get('/user', Authorization, getUsers);

module.exports = router;