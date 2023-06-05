const userService = require('../services/user.service')
const ApiError = require('../utils/api-error')

const changePassword = async (req, res, next) => {
    if (!req.body || !req.params) return next(new ApiError(400, 'Thiếu tham số bắt buộc!'))
    try {
        let message = await userService.changePassword(req.params.id, req.body)
        return res.json(message)
    } catch (error) {
        return next(new ApiError(500, error.message))
    }
}

module.exports = {
    changePassword
}