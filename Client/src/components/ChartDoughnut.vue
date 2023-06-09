<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

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
        ]
    }]
}
</script>
<template>
    <Doughnut :data="dataDoughnut" class="w-full" />
</template>