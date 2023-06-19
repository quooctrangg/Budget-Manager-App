const jwt = require('jsonwebtoken')
const userDB = require('../models/user.model')
const ApiRes = require('../utils/api-res')
require('dotenv')

const checkLogin = async (req, res, next) => {
    try {
        let token = req.cookies['Token']
        if (!token) return res.json(new ApiRes(401, 'failed', 'Bạn chưa đăng nhập!', null))
        let user = jwt.verify(token, process.env.ACCESS_TOKEN)
        let data = await userDB.findOne({ _id: user.id })
        if (data) {
            req.id = data._id
            next()
        }
        else return res.json(new ApiRes(400, 'failed', 'Không tìm thấy người dùng!', null))
    } catch (error) {
        return res.json(new ApiRes(401, 'failed', 'Bạn chưa đăng nhập!', null))
    }
}

module.exports = {
    checkLogin
}