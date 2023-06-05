const express = require('express');
const transaction = require('../controllers/transaction.controller')
const router = express.Router();

router.route('/')
    .get(transaction.findAllTransactions)
    .post(transaction.createTransaction)
    .delete(transaction.deleteAllTransactions)

router.route('/:id')
    .get(transaction.findByIdTransaction)
    .put(transaction.updateTransaction)
    .delete(transaction.deleteTransaction)

module.exports = router