import createService from './api.service'

class categoryService {
    constructor(baseUrl = '/api/category') {
        this.api = createService(baseUrl)
    }

    async findAllCategorys() {
        return (await this.api.get('/')).data
    }
}

export default new categoryService()