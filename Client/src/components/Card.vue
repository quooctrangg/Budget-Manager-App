<script setup>
import { useTransactionStore } from '../stores/transaction.store'
import { useToast } from 'vue-toast-notification'
import moment from 'moment'

const $toast = useToast()
const transactionStore = useTransactionStore()
const props = defineProps(['transaction', 'del'])
const emits = defineEmits(['submitEvent', 'submitEdit'])

const deleteTransaction = async id => {
    await transactionStore.deleteTransaction(id)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    $toast.success(transactionStore.result.message, { position: 'top-right' })
    emits('submitEvent')
}

const clickShowUpdateTransaction = id => {
    transactionStore.isShowEdit = true
    emits('submitEdit', id)
}
</script>
<template>
    <div
        class="rounded-md border-[2px] border-white bg-slate-100 bg-opacity-50 w-full p-1 focus:border-green-500 flex justify-between items-center mb-2">
        <div class="flex w-full gap-2">
            <div class="w-[10%]">
                <img :src="`/` + props.transaction.category + '.png'" alt="">
            </div>
            <div class="flex flex-col justify-between">
                <div :class="props.transaction.type === 'incomes' ? 'text-green-500' : 'text-red-500'">
                    <h3>{{ props.transaction.category }}</h3>
                </div>
                <div class="flex gap-5 text-base">
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-regular fa-money-bill-1"></i>
                        <span>
                            {{ Number(props.transaction.amount).toLocaleString('de-DE', {
                                style: 'currency', currency: 'VND'
                            }) }}
                        </span>
                    </h4>
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>
                            {{ moment(props.transaction.date).format('DD-MM-YYYY') }}
                        </span>
                    </h4>
                    <h4 class="flex gap-1 items-center">
                        <i class="fa-solid fa-message"></i>
                        <span>
                            {{ props.transaction.note }}
                        </span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="p-5">
            <i v-if="props?.del !== 'no'"
                class="fa-solid fa-pen-to-square cursor-pointer text-orange-600 hover:text-orange-400"
                @click="clickShowUpdateTransaction(props.transaction._id)"></i>
            <i class="fa-solid fa-trash cursor-pointer text-red-600 hover:text-red-400"
                @click="deleteTransaction(props.transaction._id)"></i>
        </div>
    </div>
</template>