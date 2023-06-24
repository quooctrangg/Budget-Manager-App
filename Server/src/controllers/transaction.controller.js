const transactionService = require('../services/transaction.service')
const ApiError = require('../utils/api-error')

const findAllTransactionsByUserId = async (req, res, next) => {
    try {
        let message = await transactionService.findAllTransactionsByUserId(req.id, req.query)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const createTransaction = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await transactionService.createTransaction(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const findByIdTransaction = async (req, res, next) => {
    if (!req.params) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await transactionService.findByIdTransaction(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const deleteTransaction = async (req, res, next) => {
    if (!req.params) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await transactionService.deleteTransaction(req.params.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const updateTransaction = async (req, res, next) => {
    if (!req.params || !req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await transactionService.updateTransaction(req.params.id, req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const chartBar = async (req, res, next) => {
    try {
        let message = await transactionService.chartBar(req.id, req.query)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const chartDoughnut = async (req, res, next) => {
    try {
        let message = await transactionService.chartDoughnut(req.id, req.query)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

const sumTotal = async (req, res, next) => {
    try {
        let message = await transactionService.sumTotal(req.id)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    findAllTransactionsByUserId,
    createTransaction,
    findByIdTransaction,
    deleteTransaction,
    updateTransaction,
    chartBar,
    chartDoughnut,
    sumTotal
}