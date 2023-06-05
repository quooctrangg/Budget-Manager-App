const bcrypt = require('bcrypt')
const userDB = require('../models/user.model')
const ApiRes = require('../utils/api-res')

const changePassword = async (id, data) => {
    const { oldpassword, newpassword } = data
    let user = await userDB.findById(id)
    const valiPass = await bcrypt.compare(oldpassword, user.password)
    if (valiPass) {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(newpassword, salt)
        await userDB.findByIdAndUpdate(id, { password: hashPassword }, { new: true })
        return new ApiRes(200, 'success', 'Đổi mật khẩu thành công!', null)
    }
    return new ApiRes(400, 'failed', 'Mật khẩu hiện tại không đúng!', null)
}

module.exports = {
    changePassword
}