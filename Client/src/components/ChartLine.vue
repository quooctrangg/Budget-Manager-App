<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { useTransactionStore } from '../stores/transaction.store'
import { Line } from 'vue-chartjs'
import { useToast } from 'vue-toast-notification'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js/auto'
import moment from 'moment'
import Loading from '../components/Loading.vue'

const transactionStore = useTransactionStore()
const $toast = useToast()

const props = defineProps(['data'])

ChartJs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const isLoading = ref(false)
const dataLine = reactive({
    labels: [],
    datasets: [
        {
            label: 'Thu nhập',
            backgroundColor: 'green',
            borderColor: 'green',
            data: [],
            tension: 0.2
        },
        {
            label: 'Chi tiêu',
            backgroundColor: 'red',
            borderColor: 'red',
            data: [],
            tension: 0.2
        }
    ],
    options: {
        responsive: true,
        aspectRatio: 2,
        maintainAspectRatio: false,
    }
})

const setDateLine = select => {
    let currentDate = moment(select.startdate)
    let endDate = moment(select.enddate)
    dataLine.labels = []
    switch (select.type) {
        case 'week':
            while (currentDate <= endDate) {
                dataLine.labels.push(currentDate.format('DD-MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'day')
            }
            break
        case 'month':
            while (currentDate <= endDate) {
                dataLine.labels.push(currentDate.format('DD-MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'day')
            }
            break
        case 'year':
            currentDate = moment(select.startdate)
            endDate = moment(select.enddate)
            while (currentDate <= endDate) {
                dataLine.labels.push(currentDate.format('MM-YYYY'))
                currentDate = moment(currentDate).add(1, 'month')
            }
            break
    }
}

const getDataLine = async select => {
    await transactionStore.chartLineTransaction(select)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
}

const setDataLine = dataArray => {
    dataLine.datasets[0].data = []
    dataLine.datasets[1].data = []
    dataLine.labels.forEach((date, index) => {
        dataArray.forEach(e => {
            if (e._id.date == date && e._id.type == 1) {
                dataLine.datasets[0].data.push(e.totalAmount)
            }
            if (e._id.date == date && e._id.type == -1) {
                dataLine.datasets[1].data.push(e.totalAmount * -1)
            }
        })
        if (!dataLine.datasets[0].data[index]) dataLine.datasets[0].data.push(0)
        if (!dataLine.datasets[1].data[index]) dataLine.datasets[1].data.push(0)
    })
}

const chartData = computed(() => { return { ...dataLine } })

watch(() => props.data, async (newValue) => {
    isLoading.value = true
    await getDataLine(props.data)
    setDateLine(props.data)
    setDataLine(transactionStore.result.data)
    isLoading.value = false
})

onMounted(async () => {
    isLoading.value = true
    await getDataLine(props.data)
    setDateLine(props.data)
    setDataLine(transactionStore.result.data)
    isLoading.value = false
})
</script>
<template>
    <Loading v-if="isLoading" />
    <Line v-else :height="120" :data="chartData" />
</template>