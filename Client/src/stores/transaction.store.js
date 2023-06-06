import { defineStore } from 'pinia'
import { ref } from 'vue'

import transactionService from '../services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    const err = ref(null)
    const result = ref(null)
    const transaction = ref(null)
    const isShowEdit = ref(false)

    const sortByDate = (value, type) => {
        return value.sort((a, b) => {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            if (type === 'asc') return dateA - dateB
            if (type === 'dec') return dateB - dateA
        })
    }

    const filerByType = (value, type) => {
        return value.filter((item) => {
            return item.type === type
        })
    }

    const sumAmount = value => {
        return value.reduce((acc, current) => {
            return acc + current.amount
        }, 0)
    }

    const createTransaction = async data => {
        err.value = null
        result.value = null
        try {
            let res = await transactionService.createTransaction(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const findAllTransactionById = async userId => {
        err.value = null
        result.value = null
        transaction.value = null
        try {
            let res = await transactionService.findTransactionByUserId(userId)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const deleteTransaction = async id => {
        err.value = null
        result.value = null
        transaction.value = null
        try {
            let res = await transactionService.deleteTransaction(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    return {
        err, result, transaction, isShowEdit, sortByDate, filerByType, sumAmount,
        createTransaction, findAllTransactionById, deleteTransaction
    }
})