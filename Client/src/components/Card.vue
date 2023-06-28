<script setup>
import { useTransactionStore } from '../stores/transaction.store'
import { useToast } from 'vue-toast-notification'
import moment from 'moment'

const $toast = useToast()
const transactionStore = useTransactionStore()

const props = defineProps(['transaction', 'del'])
const emits = defineEmits(['submitEvent', 'submitEdit'])

const deleteTransaction = async id => {
    if (confirm('Bạn chắc chắn muốn xóa?')) {
        await transactionStore.deleteTransaction(id)
        if (transactionStore.err) {
            $toast.error(transactionStore.err, { position: 'top-right' })
            return
        }
        $toast.success(transactionStore.result.message, { position: 'top-right' })
    }
    transactionStore.isShowEdit = false
}

const clickShowUpdateTransaction = id => {
    transactionStore.isShowEdit = true
    emits('submitEdit', id)
}
</script>
<template>
    <div
        class="rounded-md border-[2px] border-white bg-slate-100 bg-opacity-50 w-full p-1 focus:border-green-500 flex justify-between items-center mb-2">
        <div class="flex w-full gap-2 items-center">
            <div class="w-[10%] max-lg:hidden">
                <img :src="`http://localhost:8000/public/` + props.transaction.categoryId.image"
                    :alt="props.transaction.categoryId.name">
            </div>
            <div class="w-full flex flex-col justify-between">
                <div :class="props.transaction.categoryId.type === 1 ? 'text-green-500' : 'text-red-500'"
                    class="w-full flex gap-10 items-center">
                    <h3 class="w-full">{{ props.transaction.categoryId.name }}</h3>
                    <h4 class="w-full flex gap-1 items-center text-gray-600 max-lg:text-sm max-sm:text-sm">
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>
                            {{ moment(props.transaction.date).format('DD-MM-YYYY') }}
                        </span>
                    </h4>
                </div>
                <div class="w-full flex gap-5 text-sm">
                    <h4 class="w-auto flex gap-1 items-center">
                        {{ Number(props.transaction.amount).toLocaleString('de-DE') + ' VNĐ' }}
                    </h4>
                    <h4 class="flex-1 max-sm:text-xs">
                        <span class="break-words" v-if="props.transaction.note">
                            <i class="fa-solid fa-message max-lg:hidden"></i>
                            {{ props.transaction.note }}
                        </span>
                    </h4>
                </div>
            </div>
        </div>
        <div class="p-5 flex flex-col items-center gap-3">
            <i v-if="props?.del !== 'no'" class="fa-solid fa-pen-to-square cursor-pointer text-sky-500 hover:text-sky-400"
                @click="clickShowUpdateTransaction(props.transaction._id)"></i>
            <i class="fa-solid fa-trash cursor-pointer text-red-500 hover:text-red-400" @click="() => {
                deleteTransaction(props.transaction._id)
                emits('submitEvent')
            }"></i>
        </div>
    </div>
</template>