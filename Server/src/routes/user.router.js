const express = require('express')
const user = require('../controllers/user.controller')
const router = express.Router()
const middlewares = require('../middlewares/auth.middlewares')

router.route('/:id')
    .put(middlewares.checkLogin, user.changePassword)

module.exports = router