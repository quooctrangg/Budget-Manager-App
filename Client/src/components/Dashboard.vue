<script setup>
import { ref } from 'vue'
import ChartDoughnut from '../components/ChartDoughnut.vue'
import ChartLine from './ChartLine.vue'

const time = ref('7days')
const chart = ref('line')
const totalIncomes = ref(0)
const totalExpenses = ref(0)
const totalBalance = ref(0)

const handleTotal = (data) => {
    totalIncomes.value = 0
    totalExpenses.value = 0
    totalBalance.value = 0
    data.forEach(element => {
        if (element._id.type == 'incomes') {
            totalIncomes.value += element.totalAmount
        }
        if (element._id.type == 'expenses') {
            totalExpenses.value += element.totalAmount
        }
    })
    totalBalance.value = totalExpenses.value + totalIncomes.value
}
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex gap-5 justify-between">
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1"></i>
                </div>
                <div class="h-full p-2">
                    <h3 class="font-semibold text-base text-gray-600">Tổng thu nhập</h3>
                    <span class="text-gray-500">
                        {{
                            Number(totalIncomes).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
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
                            Number(totalExpenses).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
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
                            Number(totalBalance).toLocaleString('de-DE', { style: 'currency', currency: 'VND' })
                        }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flex gap-5">
            <div class="flex gap-2 items-center">
                <label class="text-base">Thống kê theo:</label>
                <select v-model="time"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 p-2 focus:border-green-500 outline-0 text-base">
                    <option value="7days">Ngày (7 ngày qua)</option>
                    <option value="6months">Tháng (6 tháng qua)</option>
                    <option value="5years">Năm (5 năm qua)</option>
                </select>
            </div>
            <div class="flex gap-5">
                <div class="flex gap-1 items-center">
                    <input type="radio" id="line" value="line" v-model="chart"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label for="line" class="ml-2 text-base font-medium text-gray-900">
                        Biểu đồ Đường
                    </label>
                </div>
                <div class="flex gap-1 items-center">
                    <input type="radio" id="doughnut" value="doughnut" v-model="chart"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                    <label for="doughnut" class="ml-2 text-base font-medium text-gray-900">
                        Biểu đồ Tròn
                    </label>
                </div>
            </div>
        </div>
        <div class="flex-1">
            <div v-if="chart == 'line'" class="border-[3px] border-white rounded-xl bg-slate-100 p-2 h-[100%]">
                <h1 class="text-2xl font-bold text-indigo-900 mb-2">Thu nhập và chi tiêu</h1>
                <ChartLine :data="time" @datatotal="(data) => { handleTotal(data) }" class="flex-1" />
            </div>
            <div v-else class="h-[100%] flex flex-col">
                <h1 class="text-2xl font-bold text-indigo-900 mb-2">Chi phí theo danh mục</h1>
                <ChartDoughnut :data="time" @datatotal="(data) => { handleTotal(data) }" class="flex-1" />
            </div>
        </div>
    </div>
</template>