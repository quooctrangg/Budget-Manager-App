import createService from './api.service'

class categoryService {
    constructor(baseUrl = '/api/category') {
        this.api = createService(baseUrl)
    }

    async findAllCategorys(type) {
        return (await this.api.get(`/?type=${type}`)).data
    }
}

export default new categoryService()