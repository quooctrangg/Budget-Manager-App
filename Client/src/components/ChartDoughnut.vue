<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useTransactionStore } from '../stores/transaction.store'
import { useCategoryStore } from '../stores/category.store'
import { useToast } from 'vue-toast-notification'

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const $toast = useToast()

const props = defineProps(['data', 'type'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const color = ['rgb(255, 0, 0)', 'rgb(255, 128, 0)', 'rgb(255, 255, 0)', 'rgb(128, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 128)',
    'rgb(0, 255, 255)', 'rgb(0, 128, 255)', 'rgb(0, 0, 255)', 'rgb(127, 0, 255)', 'rgb(255, 0, 255)', 'rgb(255, 0, 127)', 'rgb(128, 128, 128)']
const options = { responsive: true, aspectRatio: 2, maintainAspectRatio: false }

const dataDoughnutIncomes = reactive({
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: color,
        hoverOffset: 4
    }],
    options
})
const dataDoughnutExpenses = reactive({
    labels: [],
    datasets: [{
        data: [],
        backgroundColor: color,
        hoverOffset: 4
    }],
    options
})
const isLoading = ref(false)

const setCategorysDoughnut = async () => {
    await categoryStore.findAllCategorys()
    if (categoryStore.err) {
        $toast.error(categoryStore.err, { position: 'top-right' })
        return
    }
    return categoryStore.result.data
}

const getStatistic = async (time) => {
    await transactionStore.statisticTransaction(time)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    return transactionStore.result.data.chartDoughnut
}

const setDataDoughnut = (categoryArray, dataArray) => {
    categoryArray.map(e => {
        dataDoughnutIncomes.labels.push(e.name)
        dataDoughnutExpenses.labels.push(e.name)
    })
    categoryArray.map(e => {
        dataArray.forEach(element => {
            if (element._id.categoryId == e._id && element._id.type == 'incomes') {
                dataDoughnutIncomes.datasets[0].data.push(element.totalAmount)
            }
            if (element._id.categoryId == e._id && element._id.type == 'expenses') {
                dataDoughnutExpenses.datasets[0].data.push(element.totalAmount)
            }
        })
        if (!dataDoughnutExpenses.datasets[0].data) dataDoughnutExpenses.datasets[0].data.push(0)
        if (!dataDoughnutIncomes.datasets[0].data) dataDoughnutIncomes.datasets[0].data.push(0)
    })
}

const chartIncomes = computed(() => { return { ...dataDoughnutIncomes } })
const chartExpenses = computed(() => { return { ...dataDoughnutExpenses } })

const getDoughnut = async (value) => {
    isLoading.value = true
    setDataDoughnut(await setCategorysDoughnut(), await getStatistic(value))
    isLoading.value = false
}

watch(() => props.data, async (newValue) => {
    await getDoughnut(newValue)
})

onMounted(async () => {
    await getDoughnut(props.data)
})
</script>
<template>
    <div class="flex gap-10">
        <div class="max-w-[400px] text-lg text-gray-700 mb-2 border-[3px] border-white rounded-xl bg-slate-100 p-2">
            <h3 class="text-lg text-gray-700 mb-2">Thu nhập</h3>
            <Doughnut v-if="!isLoading" :data="chartIncomes" class="w-full" />
        </div>
        <div class="max-w-[400px] text-lg text-gray-700 mb-2 border-[3px] border-white rounded-xl bg-slate-100 p-2">
            <h3>Chi tiêu</h3>
            <Doughnut v-if="!isLoading" :data="chartExpenses" class="w-full" />
        </div>
    </div>
</template>