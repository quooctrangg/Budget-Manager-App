<script setup>
import Loading from './Loading.vue'
import FormAdd from '../components/FormAdd.vue'
import Card from '../components/Card.vue'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import { useUserStore } from '../stores/user.store'

const transactionStore = useTransactionStore()
const userStore = useUserStore()
const $toast = useToast();

const transaction = ref(null)
const sumAmount = ref(0)

const getTransaction = async () => {
    transaction.value = null
    await transactionStore.findAllTransactionByUserId(userStore.user._id, { sort: 1, type: 'incomes' })
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
    <h1 class="text-2xl font-bold text-indigo-900">Thu Nhập</h1>
    <div class="w-full h-[100%] mt-2">
        <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4">
            <h3 class="text-indigo-900">
                Tổng thu nhập:
                <span class="text-lime-500 font-bold">
                    {{ Number(sumAmount).toLocaleString('de-DE', {
                        style: 'currency', currency: 'VND'
                    }) }}
                </span>
            </h3>
        </div>
        <div class="w-full h-[100%] flex mt-5 gap-3">
            <div class="w-[30%] h-full">
                <FormAdd :type="'incomes'" @submitEvent="getTransaction" />
            </div>
            <div class="w-[70%] h-[80%] overflow-auto">
                <Loading v-if="transactionStore.isLoading" />
                <Card v-else v-for="item in transaction" :transaction="item" :key="item._id" @submitEvent="getTransaction"
                    @submitEdit="(id) => findTransactionById(id)" />
                <div v-if="transaction == null" class="w-full h-full flex justify-center items-center">
                    <span class="text-xl text-red-500 font-bold">Không có giao dịch!</span>
                </div>
            </div>
        </div>
    </div>
</template>