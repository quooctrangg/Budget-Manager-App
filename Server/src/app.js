const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')

const ApiError = require('./utils/api-error')

const userRouter = require('./routes/user.router')
const authRouter = require('./routes/auth.router')

const app = express();

app.use('/public', express.static(path.join(__dirname, '../src/public')))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Budget Manager application" })
})

app.use('/api/user/', userRouter)
app.use('/api/auth/', authRouter)

app.use((req, res, next) => {
    return next(new ApiError(404, 'Không tìm thấy tài nguyên'))
})

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Lỗi máy chủ nội bộ'
    })
})

module.exports = app;