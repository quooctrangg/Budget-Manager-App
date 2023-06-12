<script setup>
import { ref } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const props = defineProps(['dataDoughnut'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const dataDoughnut = ref({
    labels: props.dataDoughnut.categorys,
    datasets: [{
        data: props.dataDoughnut.data,
        backgroundColor: [
            'rgb(255, 0, 0)',
            'rgb(255, 128, 0)',
            'rgb(255, 255, 0)',
            'rgb(128, 255, 0)',
            'rgb(0, 255, 0)',
            'rgb(0, 255, 128)',
            'rgb(0, 255, 255)',
            'rgb(0, 128, 255)',
            'rgb(0, 0, 255)',
            'rgb(127, 0, 255)',
            'rgb(255, 0, 255)',
            'rgb(255, 0, 127)',
            'rgb(128, 128, 128)'
        ]
    }]
})
</script>
<template>
    <Doughnut :data="dataDoughnut" class="w-full" />
</template>