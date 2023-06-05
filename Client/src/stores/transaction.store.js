import { defineStore } from 'pinia'
import { ref } from 'vue'

import transactionService from '../services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    const err = ref(null)
    const result = ref(null)
    const transaction = ref(null)
    const isShowEdit = ref(false)

    return { err, result, transaction, isShowEdit }
})