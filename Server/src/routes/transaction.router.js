const express = require('express')
const transaction = require('../controllers/transaction.controller')
const router = express.Router()
const middlewares = require('../middlewares/auth.middlewares')

router.route('/')
    .post(middlewares.checkLogin, transaction.createTransaction)

router.route('/user/:userId')
    .get(middlewares.checkLogin, transaction.findAllTransactionsByUserId)

router.route('/statistic/:userId-:time')
    .get(middlewares.checkLogin, transaction.statisticTransaction)

router.route('/:id')
    .get(middlewares.checkLogin, transaction.findByIdTransaction)
    .put(middlewares.checkLogin, transaction.updateTransaction)
    .delete(middlewares.checkLogin, transaction.deleteTransaction)

module.exports = router