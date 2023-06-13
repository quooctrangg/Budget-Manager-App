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
    ]
})

const setDateLine = time => {
    const currentDate = new Date();
    let dataArray = []
    switch (time) {
        case '7days':
            for (let i = 6; i >= 0; i--) {
                const day = new Date();
                day.setDate(currentDate.getDate() - i);
                dataArray.push(moment(day).format('DD-MM-YYYY'));
            }
            break
        case '6months':
            for (let i = 5; i >= 0; i--) {
                const month = new Date();
                month.setMonth(currentDate.getMonth() - i);
                dataArray.push(moment(month).format('MM-YYYY'));
            }
            break
        case '5years':
            for (let i = 4; i >= 0; i--) {
                const year = new Date();
                year.setFullYear(currentDate.getFullYear() - i);
                dataArray.push(moment(year).format('YYYY'));
            }
            break
    }
    return dataArray
}

const getStatistic = async (time) => {
    await transactionStore.statisticTransaction(time)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    return transactionStore.result.data.chartLine
}

const setDataLine = (dateArray, dataArray) => {
    dataLine.labels = []
    dataLine.datasets[0].data = []
    dataLine.datasets[1].data = []
    dateArray.map(e => {
        dataLine.labels.push(e)
    })
    dateArray.forEach((date, index) => {
        dataArray.forEach(e => {
            if (e._id.date == date && e._id.type == 'incomes') {
                dataLine.datasets[0].data.push(e.totalAmount)
            }
            if (e._id.date == date && e._id.type == 'expenses') {
                dataLine.datasets[1].data.push(e.totalAmount * -1)
            }
        })
        if (!dataLine.datasets[0].data[index]) dataLine.datasets[0].data.push(0)
        if (!dataLine.datasets[1].data[index]) dataLine.datasets[1].data.push(0)
    })
}

const chartData = computed(() => { return { ...dataLine } })

const getChart = async (value) => {
    isLoading.value = true
    setDataLine(setDateLine(value), await getStatistic(value))
    isLoading.value = false
}

watch(() => props.data, async (newValue) => {
    await getChart(newValue)
})

onMounted(async () => {
    await getChart(props.data)
})
</script>
<template>
    <Loading v-if="isLoading" />
    <Line v-else :data="chartData" class="w-full" />
</template>