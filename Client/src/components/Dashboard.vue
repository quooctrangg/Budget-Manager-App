<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import { useUserStore } from '../stores/user.store'
import ChartLine from '../components/ChartLine.vue'
import ChartDoughnut from '../components/ChartDoughnut.vue'

const transactionStore = useTransactionStore()
const userStore = useUserStore()
const $toast = useToast()

const transaction = ref(null)
const select = ref({
    date: 'all',
    sort: 1,
    startDate: '',
    endDate: ''
})
const expenses = ref(0)
const incomes = ref(0)
const total = ref(0)

const getTransaction = async () => {
    transaction.value = null
    await transactionStore.findAllTransactionByUserId(userStore.user._id, select.value)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    transaction.value = transactionStore.result.data
    expenses.value = transactionStore.sumAmount(transactionStore.filerByType(transaction.value, 'expenses'))
    incomes.value = transactionStore.sumAmount(transactionStore.filerByType(transaction.value, 'incomes'))
    total.value = incomes.value - expenses.value
}

onMounted(() => {
    getTransaction()
})
</script>
<template>
    <div class="h-full flex flex-col justify-around">
        <div class="flex gap-5 justify-between">
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1"></i>
                </div>
                <div class="h-full p-2">
                    <h3 class="font-semibold text-base text-gray-600">Tổng thu nhập</h3>
                    <span class="text-gray-500">
                        {{ Number(incomes).toLocaleString('de-DE', {
                            style: 'currency', currency: 'VND'
                        }) }}
                    </span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1 text-red-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng chi tiêu</h3>
                    <span class="text-gray-500">
                        {{ Number(expenses).toLocaleString('de-DE', {
                            style: 'currency', currency: 'VND'
                        }) }}
                    </span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1 text-lime-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng số dư</h3>
                    <span class="text-gray-500">
                        {{ Number(total).toLocaleString('de-DE', {
                            style: 'currency', currency: 'VND'
                        }) }}
                    </span>
                </div>
            </div>
        </div>
        <div>
            <form class="flex items-center w-full gap-5 mb-2" @submit.prevent="getTransaction">
                <div class="flex items-center gap-1">
                    <label class="text-base">Thời gian:</label>
                    <select v-model="select.date"
                        class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 p-2 focus:border-green-500 outline-0 text-base">
                        <option value="all">Tất cả</option>
                        <option value="1day">1 ngày qua</option>
                        <option value="7days">7 ngày qua</option>
                        <option value="30days">30 ngày qua</option>
                        <option value="other">Tùy chỉnh...</option>
                    </select>
                </div>
                <div class="flex items-center gap-1" v-if="select.date === 'other'">
                    <div class="flex items-center gap-1">
                        <label class="text-sm">Từ:</label>
                        <input type="date" v-model="select.startDate"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0 text-base text-gray-400">
                    </div>
                    <div class="flex items-center gap-1">
                        <label class="text-sm">đến:</label>
                        <input type="date" v-model="select.endDate"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0 text-base text-gray-400">
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="w-auto border py-1 px-2 rounded-lg bg-green-400 hover:bg-green-200 flex items-center gap-2 text-gray-700">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        Chọn
                    </button>
                </div>
            </form>
            <div class="flex gap-2">
                <div class="w-[70%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                    <h1 class="text-2xl font-bold text-indigo-900 mb-2">Thu nhập và chi tiêu</h1>
                    <div>
                        <ChartLine :transaction="transaction" />
                    </div>
                </div>
                <div class="w-[30%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                    <h1 class="text-2xl font-bold text-indigo-900 mb-2">Chi phí theo danh mục</h1>
                    <div>
                        <ChartDoughnut />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>