const transactionDB = require('../models/transaction.model')
const ApiRes = require('../utils/api-res')
const monent = require('moment')

const findAllTransactionsByUserId = async (userId, select) => {
    const { date, type, categoryId, sort, startDate, endDate } = select
    let query = { userId: userId }
    let sortDate = {}
    if (date) {
        const start = new Date()
        const end = new Date()
        switch (date) {
            case '1day':
                start.setHours(0, 0, 0, 0)
                end.setHours(23, 59, 59, 999)
                query.date = { $gte: start, $lte: end }
                break
            case '7days':
                start.setDate(start.getDate() - 7)
                query.date = { $gte: start, $lte: end }
                break
            case '30days':
                start.setDate(start.getDate() - 30)
                query.date = { $gte: start, $lte: end }
                break
            case 'other':
                start = monent.utc(startDate, 'YYYY-MM-DD').utcOffset('+07:00')
                end = monent.utc(endDate, 'YYYY-MM-DD').utcOffset('+07:00')
                if (start > end) return new ApiRes(400, 'failed', 'Ngày bắt đầu không được lớn hơn ngày kết thúc!', null)
                if (Math.floor((end - start) / (1000 * 60 * 60 * 24)) > 60) return new ApiRes(400, 'failed', 'Tìm kiếm chỉ trong khoảng 60 ngày!', null)
                query.date = { $gte: start, $lte: end };
                break
        }
    }
    if (type && type != 'all') query.type = type
    if (categoryId && categoryId != 'all') query.categoryId = categoryId
    if (sort == 1 || sort == -1) sortDate.date = sort
    return new ApiRes(200, 'success', 'Tìm thành công!', await transactionDB.find(query).sort(sortDate).populate('categoryId'))
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
    let { amount, date, categoryId, note } = newdata
    let data = await transactionDB.findByIdAndUpdate(id, { amount, date, categoryId, note }, { new: true })
    if (!data) return new ApiRes(400, 'failed', 'Không có giao dịch!', null)
    return new ApiRes(200, 'success', 'Cập nhật giao dịch thành công!', data)
}

const statisticTransaction = async time => {
    const startDate = new Date()
    const endDate = new Date()
    let format = ''
    switch (time) {
        case '7days':
            startDate.setDate(startDate.getDate() - 7)
            format = '%d-%m-%Y'
            break
        case '6months':
            startDate.setMonth(startDate.setMonth() - 6)
            format = '%m-%Y'
            break
        case '5years':
            startDate.setFullYear(startDate.setFullYear() - 5)
            format = '%Y'
            break
        default:
            return new ApiRes(400, 'failed', 'Yêu cầu không đúng!', null)
    }
    let chartLine = await transactionDB.aggregate([
        { $match: { date: { $gte: startDate, $lte: endDate } } },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format, date: "$date" } },
                    type: "$type"
                },
                totalAmount: { $sum: "$amount" }
            }
        }
    ])
    let chartDoughnut = await transactionDB.aggregate([
        {
            $match: { date: { $gte: startDate, $lte: endDate } }
        },
        {
            $group: {
                _id: {
                    categoryId: "$categoryId",
                    type: "$type"
                },
                totalAmount: { $sum: "$amount" }
            }
        }
    ])
    return new ApiRes(200, 'success', 'Đã nhóm dữ liệu thành công!', { chartLine, chartDoughnut })
}

module.exports = {
    findAllTransactionsByUserId,
    createTransaction,
    findByIdTransaction,
    deleteTransaction,
    updateTransaction,
    statisticTransaction
}