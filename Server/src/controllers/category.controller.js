const categoryService = require('../services/category.service')
const ApiError = require('../utils/api-error')

const createCategory = async (req, res, next) => {
    if (!req.body) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await categoryService.createCategory(req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    createCategory
}