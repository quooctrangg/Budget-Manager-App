import createService from './api.service'

class userService {
    constructor(baseUrl = '/api/user') {
        this.api = createService(baseUrl)
    }

    async changPassword(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }
}

export default new userService()