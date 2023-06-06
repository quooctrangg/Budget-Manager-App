const express = require('express');
const transaction = require('../controllers/transaction.controller')
const router = express.Router();

router.route('/')
    .post(transaction.createTransaction)

router.route('/user/:userId')
    .get(transaction.findAllTransactionsByUserId)

router.route('/:id')
    .get(transaction.findByIdTransaction)
    .put(transaction.updateTransaction)
    .delete(transaction.deleteTransaction)

module.exports = router