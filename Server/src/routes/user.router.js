const express = require('express');
const user = require('../controllers/user.controller')
const router = express.Router();

router.route('/:id')
    .put(user.changePassword)

module.exports = router