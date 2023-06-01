<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
        {
            label: 'Thu nhập',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 6, 8, 12, 5]
        },
        {
            label: 'Chi tiêu',
            backgroundColor: '#f87999',
            data: [50, 20, 12, 7, 10, 4, 6]
        }
    ],

}
</script>
<template>
    <div>
        <h1 class="text-2xl font-bold text-indigo-900 mb-2">Thống Kê</h1>
    </div>
    <div class="w-full flex gap-5">
        <div class="w-[60%]">
            <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100">
                <Bar :data="chartData" class="w-full" />
            </div>
            <div class="w-full mt-5 flex flex-col gap-2">
                <div class="w-auto border-[3px] border-white rounded-xl bg-slate-100 flex justify-between items-center p-4">
                    <h3 class="font-semibold text-green-600">Tổng thu nhập</h3>
                    <span class="font-semibold text-gray-500">15000000đ</span>
                </div>
                <div class="w-auto border-[3px] border-white rounded-xl bg-slate-100 flex justify-between items-center p-4">
                    <h3 class="font-semibold text-red-500">Tổng chi tiêu</h3>
                    <span class="font-semibold text-gray-500">15000000đ</span>
                </div>
                <div class="w-auto border-[3px] border-white rounded-xl bg-slate-100 flex justify-between items-center p-4">
                    <h3 class="font-semibold text-lime-500">Tổng số dư</h3>
                    <span class="font-semibold text-gray-500">15000000đ</span>
                </div>
            </div>
        </div>
        <div class="w-[40%]">
            <h2 class="text-xl font-bold text-indigo-900 mb-2">Lịch sử chi tiêu gần đây</h2>
            <div class="flex flex-col gap-4">
                <div
                    class="flex justify-between items-center text-red-500 w-[100%] border-[3px] border-white rounded-xl bg-slate-100 p-4 text-base">
                    <h3>Test</h3>
                    <span>-1000000đ</span>
                </div>
                <div
                    class="flex justify-between items-center text-green-600 w-[100%] border-[3px] border-white rounded-xl bg-slate-100 p-4 text-base">
                    <h3>Test</h3>
                    <span>-1000000đ</span>
                </div>
                <div
                    class="flex justify-between items-center text-green-600 w-[100%] border-[3px] border-white rounded-xl bg-slate-100 p-4 text-base">
                    <h3>Test</h3>
                    <span>-1000000đ</span>
                </div>
                <div
                    class="flex justify-between items-center text-red-500 w-[100%] border-[3px] border-white rounded-xl bg-slate-100 p-4 text-base">
                    <h3>Test</h3>
                    <span>-1000000đ</span>
                </div>
            </div>
        </div>
    </div>
</template>