const bcrypt = require('bcrypt')
const userDB = require('../models/user.model')

const ApiRes = require('../utils/api-res')
const { accessToken } = require('../utils/init_token')

const loginUser = async data => {

}

const logoutUser = async () => {

}

module.exports = {
    loginUser,
    logoutUser
}