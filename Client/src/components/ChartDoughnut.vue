<script setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { useTransactionStore } from '../stores/transaction.store'
import { useCategoryStore } from '../stores/category.store'
import { useUserStore } from '../stores/user.store'
import { useToast } from 'vue-toast-notification'
import Loading from './Loading.vue'

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const userStore = useUserStore()
const $toast = useToast()

const props = defineProps(['data'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const color = ['rgb(255, 0, 0)', 'rgb(255, 128, 0)', 'rgb(255, 255, 0)', 'rgb(128, 255, 0)', 'rgb(0, 255, 0)', 'rgb(0, 255, 128)',
    'rgb(0, 255, 255)', 'rgb(0, 128, 255)', 'rgb(0, 0, 255)', 'rgb(127, 0, 255)', 'rgb(255, 0, 255)', 'rgb(255, 0, 127)', 'rgb(128, 128, 128)']
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

const setCategorysDoughnut = async () => {
    await categoryStore.findAllCategorys()
    if (categoryStore.err) {
        $toast.error(categoryStore.err, { position: 'top-right' })
        return
    }
    return categoryStore.result.data
}

const getStatistic = async (time) => {
    await transactionStore.statisticTransaction(userStore.user._id, time)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    return transactionStore.result.data.chartDoughnut
}

const setDataDoughnut = (categoryArray, dataArray) => {
    dataDoughnutIncomes.labels = []
    dataDoughnutExpenses.labels = []
    dataDoughnutIncomes.datasets[0].data = []
    dataDoughnutExpenses.datasets[0].data = []
    categoryArray.map(e => {
        dataArray.forEach(element => {
            if (element._id.categoryId == e._id && element._id.type == 'incomes') {
                dataDoughnutIncomes.datasets[0].data.push(element.totalAmount)
                dataDoughnutIncomes.labels.push(e.name)
            }
            if (element._id.categoryId == e._id && element._id.type == 'expenses') {
                dataDoughnutExpenses.datasets[0].data.push(element.totalAmount)
                dataDoughnutExpenses.labels.push(e.name)
            }
        })
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