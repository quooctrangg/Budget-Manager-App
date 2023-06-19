import createService from './api.service'

class transactionService {
    constructor(baseUrl = '/api/transaction') {
        this.api = createService(baseUrl)
    }

    async createTransaction(data) {
        return (await this.api.post('/', data)).data
    }

    async updateTransaction(id, data) {
        return (await this.api.put(`/${id}`, data)).data
    }

    async deleteTransaction(id) {
        return (await this.api.delete(`/${id}`)).data
    }

    async findTransaction(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async findTransactionByUserId(select) {
        return (await this.api.get(`/?${select}`)).data
    }

    async statisticTransaction(userId, time) {
        return (await this.api.get(`/statistic/${userId}-${time}`)).data
    }
}

export default new transactionService()