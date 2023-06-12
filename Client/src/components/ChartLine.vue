<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const props = defineProps(['data'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const dataLine = ref({
    labels: props.data.date,
    datasets: [
        {
            label: 'Thu nhập',
            backgroundColor: 'green',
            borderColor: 'green',
            data: props.data.dataIncomes,
            tension: 0.2
        },
        {
            label: 'Chi tiêu',
            backgroundColor: 'red',
            borderColor: 'red',
            data: props.data.dataExpenses,
            tension: 0.2
        }
    ]
})

</script>
<template>
    <Line :data="dataLine" class="w-full" />
</template>