const express = require('express')
const transaction = require('../controllers/transaction.controller')
const router = express.Router()
const middlewares = require('../middlewares/auth.middlewares')

router.route('/')
    .get(middlewares.checkLogin, transaction.findAllTransactionsByUserId)
    .post(middlewares.checkLogin, transaction.createTransaction)

router.route('/chartline')
    .get(middlewares.checkLogin, transaction.chartLine)

router.route('/chartdoughnut')
    .get(middlewares.checkLogin, transaction.chartDoughnut)

router.route('/:id')
    .get(middlewares.checkLogin, transaction.findByIdTransaction)
    .put(middlewares.checkLogin, transaction.updateTransaction)
    .delete(middlewares.checkLogin, transaction.deleteTransaction)

module.exports = router