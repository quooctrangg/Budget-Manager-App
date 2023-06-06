const mongoose = require('mongoose')

const schema = mongoose.Schema;

const TransactionSchema = new schema({
    userId: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        required: true,
        trim: true,
        default: Date.now
    },
    category: {
        type: String,
        require: true
    },
    note: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('transaction', TransactionSchema)