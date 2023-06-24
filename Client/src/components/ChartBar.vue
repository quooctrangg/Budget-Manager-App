<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useTransactionStore } from '../stores/transaction.store'
import { Bar } from 'vue-chartjs'
import { useToast } from 'vue-toast-notification'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js/auto'
import moment from 'moment'
import Loading from '../components/Loading.vue'

const transactionStore = useTransactionStore()
const $toast = useToast()

const props = defineProps(['data'])
const emits = defineEmits(['datatotal'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const isLoading = ref(false)
const dataBar = reactive({
    labels: [],
    datasets: [
        {
            label: 'Thu nhập',
            backgroundColor: 'green',
            data: []
        },
        {
            label: 'Chi tiêu',
            backgroundColor: 'red',
            data: []
        }
    ],
    options: {
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
    }
})

const setDateBar = select => {
    let currentDate = moment(select.startdate)
    let endDate = moment(select.enddate)
    dataBar.labels = []
    switch (select.type) {
        case 'week':
            while (currentDate <= endDate) {
                dataBar.labels.push(currentDate.format('DD-MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'day')
            }
            break
        case 'month':
            while (currentDate <= endDate) {
                dataBar.labels.push(currentDate.format('DD-MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'day')
            }
            break
        case 'year':
            currentDate = moment(select.startdate)
            endDate = moment(select.enddate)
            while (currentDate <= endDate) {
                dataBar.labels.push(currentDate.format('MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'month')
            }
            break
    }
}

const getDataBar = async select => {
    await transactionStore.chartBarTransaction(select)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
}

const setDataBar = dataArray => {
    dataBar.datasets[0].data = []
    dataBar.datasets[1].data = []
    dataBar.labels.forEach((date, index) => {
        dataArray.forEach(e => {
            if (e._id.date == date && e._id.type == 1) {
                dataBar.datasets[0].data.push(e.totalAmount)
            }
            if (e._id.date == date && e._id.type == -1) {
                dataBar.datasets[1].data.push(e.totalAmount * -1)
            }
        })
        if (!dataBar.datasets[0].data[index]) dataBar.datasets[0].data.push(0)
        if (!dataBar.datasets[1].data[index]) dataBar.datasets[1].data.push(0)
    })
    if (props.data.type == 'month') {
        for (let index = 0; index < dataBar.labels.length; index++) {
            dataBar.labels[index] = index + 1
        }
    }
}

const chartData = computed(() => { return { ...dataBar } })

watch(() => props.data, async (newValue) => {
    isLoading.value = true
    await getDataBar(props.data)
    setDateBar(props.data)
    setDataBar(transactionStore.result.data)
    emits('datatotal', transactionStore.result.data)
    isLoading.value = false
})

onMounted(async () => {
    isLoading.value = true
    await getDataBar(props.data)
    setDateBar(props.data)
    setDataBar(transactionStore.result.data)
    emits('datatotal', transactionStore.result.data)
    isLoading.value = false
})
</script>
<template>
    <Loading v-if="isLoading" />
    <Bar v-else :height="120" :data="chartData" />
</template>