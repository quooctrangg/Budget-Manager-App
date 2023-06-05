import createService from './api.service'

class transactionService {
    constructor(baseUrl = '/api/transaction') {
        this.api = createService(baseUrl)
    }
}

export default new transactionService()