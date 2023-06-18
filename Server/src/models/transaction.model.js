const { Schema, model } = require('mongoose')

const TransactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
        require: true
    },
    note: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model('transaction', TransactionSchema)