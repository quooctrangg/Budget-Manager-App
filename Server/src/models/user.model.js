const mongoose = require('mongoose')

const schema = mongoose.Schema;

const UserSchema = new schema({
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

module.exports = mongoose.model('user', UserSchema)