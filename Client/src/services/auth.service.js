import createService from './api.service'

class authService {
    constructor(baseUrl = '/api/auth') {
        this.api = createService(baseUrl)
    }

    async register(data) {
        return (await this.api.post('/register', data)).data
    }

    async login(data) {
        return (await this.api.post('/login', data)).data
    }

    async logout() {
        return (await this.api.post('/logout')).data
    }
}

export default new authService()