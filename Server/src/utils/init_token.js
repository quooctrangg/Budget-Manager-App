const jwt = require('jsonwebtoken')
require('dotenv')

const accessToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
}

module.exports = {
    accessToken
}