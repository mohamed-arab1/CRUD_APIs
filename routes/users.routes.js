const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const {
    getAllUsers,
    register,
    login
} = require('../controllers/users.controllers')

router.get('/',verifyToken, getAllUsers)
router.post('/register', register)
router.post('/login', login)

module.exports = router;