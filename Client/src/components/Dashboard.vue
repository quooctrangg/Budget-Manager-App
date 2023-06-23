<script setup>
import { ref, reactive, watch, computed } from 'vue'
import ChartDoughnut from '../components/ChartDoughnut.vue'
import ChartLine from './ChartLine.vue'
import moment from 'moment';

const select = reactive({
    type: 'week',
    startdate: moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
    enddate: moment().endOf('week').add(1, 'day').format('YYYY-MM-DD')
})
const chart = ref('line')
const totalIncomes = ref(0)
const totalExpenses = ref(0)
const totalBalance = ref(0)
const noteDate = ref(moment(select.startdate).format('DD/MM/YYYY') + ' - ' + moment(select.enddate).format('DD/MM/YYYY'))

const handleSetDate = type => {
    switch (type) {
        case 'week':
            select.startdate = moment().startOf('week').add(1, 'day').format('YYYY-MM-DD')
            select.enddate = moment().endOf('week').add(1, 'day').format('YYYY-MM-DD')
            noteDate.value = moment(select.startdate).format('DD/MM/YYYY') + ' - ' + moment(select.enddate).format('DD/MM/YYYY')
            break
        case 'month':
            select.startdate = moment().startOf('month').format('YYYY-MM-DD')
            select.enddate = moment().endOf('month').format('YYYY-MM-DD')
            noteDate.value = 'Tháng ' + moment(select.startdate).format('MM/YYYY')
            break
        case 'year':
            select.startdate = moment().startOf('year').format('YYYY-MM-DD')
            select.enddate = moment().endOf('year').format('YYYY-MM-DD')
            noteDate.value = 'Năm ' + moment(select.startdate).format('YYYY')
            break
    }
}


const handleNext = () => {
    switch (select.type) {
        case 'week':
            select.startdate = moment(select.startdate).add(1, 'week').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).add(1, 'week').format('YYYY-MM-DD')
            noteDate.value = moment(select.startdate).format('DD/MM/YYYY') + ' - ' + moment(select.enddate).format('DD/MM/YYYY')
            break
        case 'month':
            select.startdate = moment(select.startdate).add(1, 'month').startOf('month').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).add(1, 'month').endOf('month').format('YYYY-MM-DD')
            noteDate.value = 'Tháng ' + moment(select.startdate).format('MM/YYYY')
            break
        case 'year':
            select.startdate = moment(select.startdate).add(1, 'year').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).add(1, 'year').format('YYYY-MM-DD')
            noteDate.value = 'Năm ' + moment(select.startdate).format('YYYY')
            break
    }
}

const handleBack = () => {
    switch (select.type) {
        case 'week':
            select.startdate = moment(select.startdate).subtract(1, 'week').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).subtract(1, 'week').format('YYYY-MM-DD')
            noteDate.value = moment(select.startdate).format('DD/MM/YYYY') + ' - ' + moment(select.enddate).format('DD/MM/YYYY')
            break
        case 'month':
            select.startdate = moment(select.startdate).subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
            noteDate.value = 'Tháng ' + moment(select.startdate).format('MM/YYYY')
            break
        case 'year':
            select.startdate = moment(select.startdate).subtract(1, 'year').format('YYYY-MM-DD')
            select.enddate = moment(select.enddate).subtract(1, 'year').format('YYYY-MM-DD')
            noteDate.value = 'Năm ' + moment(select.startdate).format('YYYY')
            break
    }
}

const totalTransaction = (data) => {
    totalIncomes.value = 0
    totalExpenses.value = 0
    totalBalance.value = 0
    data.forEach(element => {
        if (element._id.type == 1) {
            totalIncomes.value += element.totalAmount
        }
        if (element._id.type == -1) {
            totalExpenses.value += element.totalAmount
        }
    });
    totalBalance.value = totalIncomes.value + totalExpenses.value
}

const selectType = computed(() => { return { ...select } })

watch(() => select.type, () => {
    handleSetDate(select.type)
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-5 justify-between">
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="bg-white h-full w-[30%] flex justify-center items-center text-4xl">
                    <i class="fa-regular fa-money-bill-1 text-green-500"></i>
                </div>
                <div class="h-full p-2">
                    <h3 class="font-semibold text-base text-gray-600">Tổng thu nhập</h3>
                    <span class="text-gray-500">
                        {{
                            Number(totalIncomes).toLocaleString('de-DE') + ' VNĐ'
                        }}
                    </span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="bg-white h-full w-[30%] flex justify-center items-center text-4xl">
                    <i class="fa-regular fa-money-bill-1 text-red-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng chi tiêu</h3>
                    <span class="text-gray-500">
                        {{
                            Number(totalExpenses).toLocaleString('de-DE') + ' VNĐ'
                        }}
                    </span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="bg-white h-full w-[30%] flex justify-center items-center text-4xl">
                    <i class="fa-regular fa-money-bill-1 text-blue-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng số dư</h3>
                    <span class="text-gray-500">
                        {{
                            Number(totalBalance).toLocaleString('de-DE') + ' VNĐ'
                        }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex gap-5">
            <div class="flex gap-2 items-center">
                <label class="text-base">Thống kê theo:</label>
                <select v-model="select.type"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 p-2 focus:border-green-500 outline-0 text-base">
                    <option value="week">Tuần</option>
                    <option value="month">Tháng</option>
                    <option value="year">Năm</option>
                </select>
            </div>
            <div class="flex gap-5">
                <div class="flex gap-1 items-center">
                    <input type="radio" id="line" value="line" v-model="chart"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label for="line" class="ml-2 text-base font-medium text-gray-900">
                        Thống kê "Thu nhập và chi tiêu"
                    </label>
                </div>
                <div class="flex gap-1 items-center">
                    <input type="radio" id="doughnut" value="doughnut" v-model="chart"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label for="doughnut" class="ml-2 text-base font-medium text-gray-900">
                        Thống kê "Chi phí theo danh mục"
                    </label>
                </div>
            </div>
        </div>
        <div class="flex-1">
            <div v-if="chart == 'line'" class="border-[3px] border-white rounded-xl bg-slate-100 p-2 h-[100%]">
                <div class="flex justify-between items-center">
                    <button class="px-2 text-2xl text-red-500 hover:text-red-300" @click="handleBack">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-2xl font-bold text-indigo-900">Thu nhập và chi tiêu </h1>
                        <span class="text-xs text-red-500">{{ noteDate }}</span>
                    </div>
                    <button class="px-2 text-2xl text-red-500 hover:text-red-300" @click="handleNext">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <ChartLine :data="selectType" @datatotal="(data) => totalTransaction(data)" />
            </div>
            <div v-else class="h-[100%] flex flex-col">
                <div class="flex justify-between items-center">
                    <button class="px-2 text-2xl text-red-500 hover:text-red-300" @click="handleBack">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <div class="flex flex-col justify-center items-center">
                        <h1 class="text-2xl font-bold text-indigo-900">Chi phí theo danh mục</h1>
                        <span class="text-xs text-red-500">{{ noteDate }}</span>
                    </div>
                    <button class="px-2 text-2xl text-red-500 hover:text-red-300" @click="handleNext">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
                <ChartDoughnut :data="selectType" class="flex-1" @datatotal="(data) => totalTransaction(data)" />
            </div>
        </div>
    </div>
</template>