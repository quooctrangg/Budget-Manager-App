<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const props = defineProps(['transaction'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const dataLine = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
        {
            label: 'Thu nhập',
            backgroundColor: 'green',
            data: [40, 20, 12, 6, 8, 12, 5],
            tension: .2
        },
        {
            label: 'Chi tiêu',
            backgroundColor: 'red',
            data: [50, 20, 12, 7, 10, 4, 6],
            tension: .2
        }
    ]
}
</script>
<template>
    <Line :data="dataLine" class="w-full" />
</template>