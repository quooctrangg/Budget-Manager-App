const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model('category', CategorySchema)