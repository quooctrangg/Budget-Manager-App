const transactionDB = require('../models/transaction.model')
const ApiRes = require('../utils/api-res')
const monent = require('moment')
const mongoose = require('mongoose')

const findAllTransactionsByUserId = async (userId, select) => {
    const { date, type, categoryId, sort, startDate, endDate } = select
    let query = { userId: userId }
    let sortDate = {}
    let selectType = {}
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
    if (type && type == -1 || type == 1) selectType.type = { $eq: type }
    if (categoryId && categoryId != 'all') query.categoryId = categoryId
    if (sort == 1 || sort == -1) sortDate.date = sort
    let data = await transactionDB.find(query).sort(sortDate).populate({ path: 'categoryId', match: selectType })
    data = data.filter(e => e.categoryId !== null);
    return new ApiRes(200, 'success', 'Tìm thành công!', data)
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

const chartLine = async (userId, select) => {
    const { type, startdate, enddate } = select
    let format = ''
    let start = new Date(startdate)
    let end = new Date(enddate)
    switch (type) {
        case 'week':
            format = '%d-%m-%Y'
            break
        case 'month':
            format = '%d-%m-%Y'
            break
        case 'year':
            format = '%m-%Y'
            break
        default:
            return new ApiRes(400, 'failed', 'Yêu cầu không đúng!', null)
    }
    let data = await transactionDB.aggregate([
        {
            $match: {
                date: { $gte: start, $lte: end },
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $group: {
                _id: {
                    date: { $dateToString: { format, date: "$date" } },
                    type: "$category.type",
                },
                totalAmount: { $sum: "$amount" }
            }
        }
    ])
    return new ApiRes(200, 'success', 'Đã nhóm dữ liệu thành công!', data)
}

const chartDoughnut = async (userId, select) => {
    const { startdate, enddate } = select
    let start = new Date(startdate)
    let end = new Date(enddate)
    let data = await transactionDB.aggregate([
        {
            $match: {
                date: { $gte: start, $lte: end },
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $group: {
                _id: {
                    name: "$category.name",
                    type: "$category.type",
                },
                totalAmount: { $sum: "$amount" }
            }
        }
    ])
    return new ApiRes(200, 'success', 'Đã nhóm dữ liệu thành công!', data)
}

module.exports = {
    findAllTransactionsByUserId,
    createTransaction,
    findByIdTransaction,
    deleteTransaction,
    updateTransaction,
    chartLine,
    chartDoughnut
}