<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useTransactionStore } from '../stores/transaction.store'
import { useToast } from 'vue-toast-notification'
import Loading from './Loading.vue'

const transactionStore = useTransactionStore()
const $toast = useToast()

const props = defineProps(['data'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const color = ['rgba(255, 0, 0, 0.7)', 'rgba(255, 128, 0, 0.7)', 'rgba(255, 255, 0,0.7)', 'rgba(128, 255, 0,0.7)', 'rgba(0, 255, 0, 0.7)', 'rgba(0, 255, 128, 0.7)',
    'rgba(0, 255, 255, 0.7)', 'rgba(0, 128, 255, 0.7)', 'rgba(0, 0, 255, 0.7)', 'rgba(127, 0, 255, 0.7)', 'rgba(255, 0, 255, 0.7)', 'rgba(255, 0, 127, 0.7)', 'rgba(128, 128, 128, 0.7)']
const options = { responsive: true, aspectRatio: 2, maintainAspectRatio: false }

const isLoading = ref(false)
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

const getDataDoughnut = async select => {
    await transactionStore.chartDoughnutTransaction(select)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
}

const setDataDoughnut = (dataArray) => {
    dataDoughnutIncomes.labels = []
    dataDoughnutExpenses.labels = []
    dataDoughnutIncomes.datasets[0].data = []
    dataDoughnutExpenses.datasets[0].data = []
    dataArray.forEach(element => {
        if (element._id.type == 1) {
            dataDoughnutIncomes.datasets[0].data.push(element.totalAmount)
            dataDoughnutIncomes.labels.push(element._id.name)
        }
        if (element._id.type == -1) {
            dataDoughnutExpenses.datasets[0].data.push(element.totalAmount)
            dataDoughnutExpenses.labels.push(element._id.name)
        }
    })
}

const chartIncomes = computed(() => { return { ...dataDoughnutIncomes } })

const chartExpenses = computed(() => { return { ...dataDoughnutExpenses } })

watch(() => props.data, async (newValue) => {
    await getDataDoughnut(props.data)
    setDataDoughnut(transactionStore.result.data)
})

onMounted(async () => {
    await getDataDoughnut(props.data)
    setDataDoughnut(transactionStore.result.data)
})
</script>
<template>
    <Loading v-if="isLoading" />
    <div v-else
        class="flex gap-10 justify-center text-lg text-gray-700 border-[3px] border-white rounded-xl bg-slate-100 p-2">
        <div class="flex flex-col justify-center items-center flex-1">
            <div v-if="!chartIncomes.datasets[0].data.length" class="text-red-500">Chưa có dữ liệu...</div>
            <Doughnut v-else :data="chartIncomes" class="w-full h-full" />
            <h3>Thu nhập</h3>
        </div>
        <div class="flex flex-col justify-center items-center flex-1">
            <div v-if="!chartExpenses.datasets[0].data.length" class="text-red-500">Chưa có dữ liệu...</div>
            <Doughnut v-else :data="chartExpenses" class="w-full h-full" />
            <h3>Chi tiêu</h3>
        </div>
    </div>
</template>