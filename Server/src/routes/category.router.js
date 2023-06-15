const express = require('express');
const category = require('../controllers/category.controller')
const router = express.Router()
const middlewares = require('../middlewares/auth.middlewares')

router.route('/')
    .get(middlewares.checkLogin, category.findAllCategorys)
//.post(category.createCategory)

module.exports = router