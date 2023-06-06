import { defineStore } from 'pinia'
import { ref } from 'vue'
import moment from 'moment'

import transactionService from '../services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    const err = ref(null)
    const result = ref(null)
    const isShowEdit = ref(false)
    const data = ref({
        userId: '',
        amount: '',
        date: '',
        type: '',
        category: '',
        note: ''
    })
    const idTransacton = ref(null)

    const resetData = () => {
        data.value.userId = ''
        data.value.amount = ''
        data.value.date = ''
        data.value.type = ''
        data.value.category = ''
        data.value.note = ''
    }

    const setData = newdata => {
        data.value.userId = newdata.userId
        data.value.amount = newdata.amount
        data.value.date = moment(newdata.date).format('YYYY-MM-DD')
        data.value.type = newdata.type
        data.value.category = newdata.category
        data.value.note = newdata.note
    }

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

    const totalBalance = (value) => {
        let incomes = sumAmount(filerByType(value, 'incomes'))
        let expenses = sumAmount(filerByType(value, 'expenses'))
        return incomes - expenses
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

    const findAllTransactionByUserId = async userId => {
        err.value = null
        result.value = null
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
        try {
            let res = await transactionService.deleteTransaction(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const findTransactionById = async id => {
        err.value = null
        result.value = null
        try {
            let res = await transactionService.findTransaction(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const updateTransaction = async (id, data) => {
        err.value = null
        result.value = null
        try {
            let res = await transactionService.updateTransaction(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    return {
        err, result, isShowEdit, data, idTransacton, setData, resetData, sortByDate, filerByType, sumAmount, totalBalance,
        createTransaction, findAllTransactionByUserId, deleteTransaction, findTransactionById,
        updateTransaction
    }
})