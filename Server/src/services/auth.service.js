const bcrypt = require('bcrypt')

const userDB = require('../models/user.model')

const ApiRes = require('../utils/api-res')
const { accessToken } = require('../utils/init_token')

const registerUser = async data => {
    let { email, password } = data
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    let user = await userDB.findOne({ email: email })
    if (user) return new ApiRes(400, 'failed', 'Email đã tồn tại!', null)
    await userDB.create({ email, password: hashPassword })
    return new ApiRes(200, 'success', 'Đăng ký thành công!', null)
}

const loginUser = async data => {
    let { email, password } = data
    const user = await userDB.findOne({ email: email })
    if (!user) return new ApiRes(400, 'failed', 'Email không tồn tại!', null)
    else {
        const valiPass = await bcrypt.compare(password, user.password)
        if (!valiPass) return new ApiRes(400, 'failed', 'Sai mật khẩu!', null)
        else {
            let token = accessToken(user)
            let { password, ...others } = user._doc
            return new ApiRes(200, 'success', 'Đăng nhập thành công!', { token, ...others })
        }
    }
}

module.exports = {
    registerUser,
    loginUser,
}