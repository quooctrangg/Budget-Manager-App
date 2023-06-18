const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    image: {
        type: String
    },
    type: {
        type: Number,
        require: true
    }
})

module.exports = model('category', CategorySchema)