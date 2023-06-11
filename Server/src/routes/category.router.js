const express = require('express');
const category = require('../controllers/category.controller')
const router = express.Router();

router.route('/')
    .post(category.createCategory)

module.exports = router