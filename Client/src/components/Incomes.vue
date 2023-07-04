<script setup>
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import Loading from './Loading.vue'
import FormAdd from '../components/FormAdd.vue'
import Card from '../components/Card.vue'

const transactionStore = useTransactionStore()
const $toast = useToast();

const transaction = ref([])
const sumAmount = ref(0)

const getTransaction = async () => {
    transaction.value = []
    await transactionStore.findAllTransactionByUserId({ sort: -1, type: 1 })
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    transaction.value = transactionStore.result.data
    sumAmount.value = transactionStore.sumAmount(transaction.value)
}

const findTransactionById = async id => {
    await transactionStore.findTransactionById(id)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    transactionStore.idTransaction = id
    transactionStore.setData(transactionStore.result.data)
}

onMounted(() => {
    getTransaction()
})
</script>
<template>
    <section class="flex flex-col h-full">
        <h1 class="text-2xl font-bold text-indigo-900">Thu Nhập</h1>
        <div class="w-full h-[100%] flex flex-col">
            <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4">
                <h3 class="text-indigo-900">
                    Tổng thu nhập:
                    <span class="text-green-500 font-bold">
                        {{ Number(sumAmount).toLocaleString('de-DE') + ' VNĐ' }}
                    </span>
                </h3>
            </div>
            <div class="w-full h-[100%] flex mt-5 gap-3 max-sm:flex-col">
                <div class="w-[30%] h-full max-sm:w-full max-sm:flex-1">
                    <FormAdd :type="1" @submitEvent="getTransaction" class="max-sm:h-full" />
                </div>
                <div class="w-[70%] overflow-auto max-sm:w-full max-sm:flex-1">
                    <Loading v-if="transactionStore.isLoading" />
                    <Card v-else v-for="item in transaction" :transaction="item" :key="item._id"
                        @submitEvent="getTransaction" @submitEdit="(id) => findTransactionById(id)" />
                    <div v-if="transaction == null || transaction?.length == 0"
                        class="w-full h-full flex justify-center items-center">
                        <span class="text-xl text-red-500 font-bold">Không có giao dịch!</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>