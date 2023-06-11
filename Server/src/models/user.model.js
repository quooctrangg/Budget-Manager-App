const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

module.exports = model('user', UserSchema)