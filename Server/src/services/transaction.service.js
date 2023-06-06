const transactionDB = require('../models/transaction.model')
const ApiRes = require('../utils/api-res')
const monent = require('moment')

const findAllTransactionsByUserId = async userId => {
    return new ApiRes(200, 'success', 'Tìm thành công!', await transactionDB.find({ userId: userId }))
}

const createTransaction = async data => {
    if (data.date) data.date = monent.utc(data.date, 'YYYY-MM-DD').utcOffset('+07:00')
    return new ApiRes(200, 'success', 'Tạo giao dịch thành công!', await transactionDB.create(data))
}

const findByIdTransaction = async id => {
    let data = await transactionDB.findById(id)
    if (!data) return new ApiRes(400, 'failed', 'Không có giao dịch!', null)
    return new ApiRes(200, 'success', 'Tìm thấy giao dịch!', data)
}

const deleteTransaction = async id => {
    let data = await transactionDB.findByIdAndDelete(id)
    if (!data) return new ApiRes(400, 'failed', 'Không có giao dịch!', null)
    return new ApiRes(200, 'success', 'Xoá giao dịch thành công!', data)
}

const updateTransaction = async (id, newdata) => {
    let { amount, date, category, note } = newdata
    let data = await transactionDB.findByIdAndUpdate(id, { amount, date, category, note }, { new: true })
    if (!data) return new ApiRes(400, 'failed', 'Không có giao dịch!', null)
    return new ApiRes(200, 'success', 'Cập nhật giao dịch thành công!', data)
}

module.exports = {
    findAllTransactionsByUserId,
    createTransaction,
    findByIdTransaction,
    deleteTransaction,
    updateTransaction
}