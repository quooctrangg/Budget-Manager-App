import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import moment from 'moment'

import transactionService from '../services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    const $toast = useToast()

    const err = ref(null)
    const result = ref(null)
    const isShowEdit = ref(false)
    const isLoading = ref(false)
    const warningTotal = ref(false)
    const total = ref(0)
    const data = ref({
        userId: '',
        amount: '',
        date: moment(new Date()).format('YYYY-MM-DD'),
        type: '',
        categoryId: '',
        note: ''
    })
    const idTransaction = ref(null)

    const resetData = () => {
        data.value.userId = ''
        data.value.amount = ''
        data.value.date = moment(new Date()).format('YYYY-MM-DD')
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

    const totalBalance = value => {
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
            getTotal()
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const findAllTransactionByUserId = async select => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let queryString = Object.keys(select)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(select[key]))
                .join("&");
            let res = await transactionService.findTransactionByUserId(queryString)
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
            getTotal()
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
            getTotal()
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const chartBarTransaction = async select => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let queryString = Object.keys(select)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(select[key]))
                .join("&");
            let res = await transactionService.chartBarTransaction(queryString)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const chartDoughnutTransaction = async select => {
        err.value = null
        result.value = null
        isLoading.value = true
        try {
            let queryString = Object.keys(select)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(select[key]))
                .join("&");
            let res = await transactionService.chartDoughnutTransaction(queryString)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        } finally {
            isLoading.value = false
        }
    }

    const getTotal = async () => {
        try {
            let res = await transactionService.getTotal()
            total.value = res.data[0]?.totalAmount || 0
            if (res.data[0]?.count != 0) {
                if (res.data[0]?.totalAmount < 200000) {
                    warningTotal.value = true
                    $toast.warning('Số dư của bạn quá thấp!', { position: 'top-right' })
                } else {
                    warningTotal.value = false
                }
            } else {
                warningTotal.value = false
            }
        } catch (error) {
            err.value = error.message
        }
    }

    onMounted(() => {
        getTotal()
    })

    return {
        err, result, isShowEdit, data, idTransaction, isLoading, warningTotal, total, setData, resetData, sumAmount, filerByType, totalBalance,
        createTransaction, findAllTransactionByUserId, deleteTransaction, findTransactionById,
        updateTransaction, chartBarTransaction, chartDoughnutTransaction
    }
})