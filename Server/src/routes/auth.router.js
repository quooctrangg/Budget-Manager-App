const express = require('express')
const auth = require('../controllers/auth.controller')
const router = express.Router()

router.route('/login')
    .post(auth.loginUser)

router.route('/logout')
    .post(auth.logoutUser)

router.route('/register')
    .post(auth.registerUser)

module.exports = router