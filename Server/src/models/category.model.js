const { Schema, model } = require('mongoose')

const CategorySchema = new Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    type: {
        type: Number
    }
})

module.exports = model('category', CategorySchema)