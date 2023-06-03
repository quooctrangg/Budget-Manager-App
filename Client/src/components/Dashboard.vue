<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const dataBar = {
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
    ]
}

const dataDoughnut = {
    labels: ['Giải trí', 'Sức khỏe', 'Ăn uống', 'Di chuyển', 'Phiếu lương', 'Khác'],
    datasets: [{
        label: 'My First Dataset',
        data: [100, 50, 100, 25, 30, 50],
        backgroundColor: [
            'rgb(0, 102, 255)',
            'rgb(0, 255, 153)',
            'rgb(255, 204, 153)',
            'rgb(255, 255, 102)',
            'rgb(102, 153, 0)',
            'rgb(102, 153, 153)'
        ],
    }]
}
</script>
<template>
    <div class="h-full flex flex-col justify-around">
        <div class="flex gap-5 justify-between mb-4">
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1"></i>
                </div>
                <div class="h-full p-2">
                    <h3 class="font-semibold text-base text-gray-600">Tổng thu nhập</h3>
                    <span class="text-gray-500">15.000.000đ</span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1 text-red-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng chi tiêu</h3>
                    <span class="text-gray-500">-5.000.000đ</span>
                </div>
            </div>
            <div class="w-full border-[3px] border-white rounded-xl bg-slate-100 flex items-center">
                <div class="text-green-500 bg-white h-full w-[30%] flex justify-center items-center text-3xl">
                    <i class="fa-regular fa-money-bill-1 text-lime-500"></i>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-base text-gray-600 ">Tổng số dư</h3>
                    <span class="text-gray-500">10.000.000đ</span>
                </div>
            </div>
        </div>
        <div class="flex gap-2">
            <div class="w-[70%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                <h1 class="text-2xl font-bold text-indigo-900 mb-2">Thu nhập và chi tiêu</h1>
                <div>
                    <Bar :data="dataBar" class="w-full" />
                </div>
            </div>
            <div class="w-[30%] border-[3px] border-white rounded-xl bg-slate-100 p-2">
                <h1 class="text-2xl font-bold text-indigo-900 mb-2">Chi phí theo danh mục</h1>
                <div>
                    <Doughnut :data="dataDoughnut" class="w-full" />
                </div>
            </div>
        </div>
    </div>
</template>