const express = require('express');
const user = require('../controllers/user.controller')
const router = express.Router();

router.route('/')
    .post(user.registerUser)

router.route('/:id')
    .get(user.findUser)
    .put(user.changePassword)

module.exports = router