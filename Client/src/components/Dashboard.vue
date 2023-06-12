<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import ChartDoughnut from '../components/ChartDoughnut.vue'
import ChartLine from './ChartLine.vue'
import moment from 'moment'

const transactionStore = useTransactionStore()
const $toast = useToast()

const chartline = ref([])
const chartdoughnut = ref([])
const time = ref('7days')
const isLoading = ref(false)
const type = ref('incomes')
const data = reactive({
    date: [],
    dataIncomes: [],
    dataExpenses: []
})
const dataDoughnut = reactive({
    categorys: [],
    data: []
})

const setDate = time => {
    const currentDate = new Date();
    data.date = []
    switch (time) {
        case '7days':
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(currentDate.getDate() - i);
                data.date.push(moment(day).format('DD-MM-YYYY'));
            }
            break
        case '6months':
            for (let i = 5; i >= 0; i--) {
                const month = new Date();
                month.setMonth(currentDate.getMonth() - i);
                data.date.push(moment(month).format('MM-YYYY'));
            }
            break
        case '5years':
            for (let i = 4; i >= 0; i--) {
                const year = new Date();
                year.setFullYear(currentDate.getFullYear() - i);
                data.date.push(moment(year).format('YYYY'));
            }
            break
    }
}

const setDataLine = DA => {
    setDate(time.value)
    data.dataIncomes = []
    data.dataExpenses = []
    data.date.forEach((date, index) => {
        data.dataIncomes.push(0)
        data.dataExpenses.push(0)
        DA.forEach(e => {
            if (e._id.date == date && e._id.type == 'incomes') {
                data.dataIncomes.splice(index, 1, e.totalAmount)
            }
            if (e._id.date == date && e._id.type == 'expenses') {
                data.dataExpenses.splice(index, 1, e.totalAmount * -1)
            }
        })
    });
}

const statisticTransaction = async () => {
    isLoading.value = true
    await transactionStore.statisticTransaction(time.value)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    chartline.value = transactionStore.result.data.chartLine
    chartdoughnut.value = transactionStore.result.data.chartDoughnut
    setDataLine(chartline.value)
    isLoading.value = false
}

const submitType = () => {
    console.log(chartdoughnut.value);
}

onMounted(() => {
    statisticTransaction()
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
                        {{
                            Number(0).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
                        }}
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
                        {{
                            Number(0).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
                        }}
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
                        {{
                            Number(0).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
                        }}
                    </span>
                </div>
            </div>
        </div>
        <div>
            <form class="flex items-center w-full gap-5 mb-2" @submit.prevent="statisticTransaction()">
                <div class="flex items-center gap-1">
                    <label class="text-base">Thống kê theo:</label>
                    <select v-model="time"
                        class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 p-2 focus:border-green-500 outline-0 text-base">
                        <option value="7days">Ngày (7 ngày qua)</option>
                        <option value="6months">Tháng (6 tháng qua)</option>
                        <option value="5years">Năm (5 năm qua)</option>
                    </select>
                </div>
                <div>
                    <button type="submit"
                        class="w-auto border py-1 px-2 rounded-lg bg-green-400 hover:bg-green-300 flex items-center gap-2 text-gray-600">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        Chọn
                    </button>
                </div>
            </form>
            <div class="flex gap-2">
                <div class="w-[70%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                    <h1 class="text-2xl font-bold text-indigo-900 mb-2">Thu nhập và chi tiêu</h1>
                    <div>
                        <ChartLine v-if="!isLoading" :data="data" />
                    </div>
                </div>
                <div class="w-[30%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                    <div class="flex gap-1">
                        <h1 class="text-lg font-bold text-indigo-900 mb-2">Chi phí theo danh mục</h1>
                        <select @change="submitType" v-model="type"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 p-1 focus:border-green-500 outline-0 text-base">
                            <option value="incomes">Thu Nhập</option>
                            <option value="expenses">Chi Tiêu</option>
                        </select>
                    </div>
                    <div>
                        <ChartDoughnut v-if="!isLoading" :dataDoughnut="dataDoughnut" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>