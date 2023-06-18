const categoryDB = require('../models/category.model')
const ApiRes = require('../utils/api-res')

const createCategory = async data => {
    let { name, image } = data
    return new ApiRes(200, 'success', 'Tạo danh mục thành công!', await categoryDB.create({ name, image }))
}

const findAllCategorys = async (type) => {
    let select = {}
    if (type && type == 1 || type == -1) {
        select.type = type
    }
    return new ApiRes(200, 'success', '', await categoryDB.find(select))
}

module.exports = {
    createCategory, findAllCategorys
}