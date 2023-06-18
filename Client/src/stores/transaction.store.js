import { defineStore } from 'pinia'
import { ref } from 'vue'
import moment from 'moment'

import transactionService from '../services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    const err = ref(null)
    const result = ref(null)
    const isShowEdit = ref(false)
    const isLoading = ref(false)
    const data = ref({
        userId: '',
        amount: '',
        date: '',
        type: '',
        categoryId: '',
        note: ''
    })
    const idTransaction = ref(null)

    const resetData = () => {
        data.value.userId = ''
        data.value.amount = ''
        data.value.date = ''
        data.value.type = ''
        data.value.categoryId = ''
        data.value.note = ''
    }

    const setData = newdata => {
        data.value.userId = newdata.userId
        data.value.amount = newdata.amount
        data.value.date = moment(newdata.date).format('YYYY-MM-DD')
        data.value.type = newdata.type
        data.value.categoryId = newdata.categoryId
        data.value.note = newdata.note
    }

    const filerByType = (value, type) => {
        return value.filter((item) => {
            return item.categoryId.type === type
        })
    }

    const sumAmount = value => {
        return value.reduce((acc, current) => {
            return acc + current.amount
        }, 0)
    }

    const totalBalance = (value) => {
        let incomes = sumAmount(filerByType(value, 1))
        let expenses = sumAmount(filerByType(value, -1))
        return incomes + expenses
    }

    const createTransaction = async data => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let res = await transactionService.createTransaction(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findAllTransactionByUserId = async (userId, select) => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let queryString = Object.keys(select)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(select[key]))
                .join("&");
            let res = await transactionService.findTransactionByUserId(userId, queryString)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const deleteTransaction = async id => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let res = await transactionService.deleteTransaction(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findTransactionById = async id => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let res = await transactionService.findTransaction(id)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const updateTransaction = async (id, data) => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let res = await transactionService.updateTransaction(id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const statisticTransaction = async (userId, time) => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let res = await transactionService.statisticTransaction(userId, time)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    return {
        err, result, isShowEdit, data, idTransaction, isLoading, setData, resetData, sumAmount, filerByType, totalBalance,
        createTransaction, findAllTransactionByUserId, deleteTransaction, findTransactionById,
        updateTransaction, statisticTransaction
    }
})