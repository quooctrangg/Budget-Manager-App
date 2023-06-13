<script setup>
import { ref, reactive, watchEffect, watch } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'

const props = defineProps(['data'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

// const data = reactive({
//     categorys: [],
//     id: [],
//     data: []
// })

// const setDataDoughnut = () => {
//     categoryStore.result.data.forEach(element => {
//         dataDoughnut.categorys.push(element.name)
//         dataDoughnut.id.push(element._id)
//         dataDoughnut.data.push(0)
//     })
//     if (type.value == 'incomes') {
//         dataDoughnut.id.forEach((e, index) => {
//             chartdoughnut.value.forEach(element => {
//                 if (element._id.type == 'incomes' && element._id.categoryId == e) {
//                     dataDoughnut.data.splice(index, 1, element.totalAmount)
//                 }
//             })
//         })
//     } else if (type.value == 'expenses') {
//         dataDoughnut.id.forEach((e, index) => {
//             chartdoughnut.value.forEach(element => {
//                 if (element._id.type == 'expenses' && element._id.categoryId == e) {
//                     dataDoughnut.data.splice(index, 1, element.totalAmount)
//                 }
//             })
//         })
//     }
// }

const dataDoughnut = ref({
    labels: [],
    datasets: [{
        data: [],
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

watch(() => props.data, (newValue, oldValue) => {
    console.log(newValue, oldValue);
})
</script>
<template>
    {{ props.data }}
    <Doughnut :data="dataDoughnut" class="w-full" />
</template>