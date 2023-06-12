<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import { useUserStore } from '../stores/user.store'
import { useCategoryStore } from '../stores/category.store'
import moment from 'moment'

const transactionStore = useTransactionStore()
const userStore = useUserStore()
const categoryStore = useCategoryStore()
const $toast = useToast();
const props = defineProps(['type'])
const emits = defineEmits(['submitEvent'])

const categoryErr = ref(false)
const categorys = ref(null)
const date = ref(new Date())

const submitTransaction = async () => {
    if (transactionStore.data.category === '') {
        categoryErr.value = true
        return
    } else {
        categoryErr.value = false
    }

    if (!transactionStore.isShowEdit) {
        transactionStore.data.userId = userStore.user._id
        transactionStore.data.type = props.type
        await transactionStore.createTransaction(transactionStore.data)
    } else {
        await transactionStore.updateTransaction(transactionStore.idTransaction, transactionStore.data)
    }

    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    $toast.success(transactionStore.result.message, { position: 'top-right' })
    emits('submitEvent')
    transactionStore.resetData()
    transactionStore.isShowEdit = false
}

const findAllCategorys = async () => {
    await categoryStore.findAllCategorys()
    if (categoryStore.err) {
        $toast.error(categoryStore.err, { position: 'top-right' })
        return
    }
    categorys.value = categoryStore.result.data
}

const cancelSubmit = () => {
    transactionStore.isShowEdit = false
    transactionStore.idTransaction = null
    transactionStore.resetData()
}

onMounted(() => {
    cancelSubmit()
    findAllCategorys()
})
</script>
<template>
    <form class="w-full  flex flex-col gap-3" @submit.prevent="submitTransaction">
        <input type="number" required v-model="transactionStore.data.amount" :max="props.type == 'expenses' ? -1 : ''"
            :min="props.type == 'incomes' ? 1 : ''"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"
            placeholder="Số tiền">
        <input type="date" required v-model="transactionStore.data.date" :max="moment(date).format('YYYY-MM-DD')"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
        <select v-model="transactionStore.data.categoryId"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
            <option value="">Chọn loại giao dịch</option>
            <option v-for="category in categorys" :key="category._id" :value="category._id">{{ category.name }}</option>
        </select>
        <span v-if="categoryErr" class="text-red-500 text-xs">Hãy chọn loại giao dịch!</span>
        <textarea rows="5" placeholder="Ghi chú" maxlength="100" v-model="transactionStore.data.note"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"></textarea>
        <div class="w-full flex justify-center">
            <button type="submit" v-if="!transactionStore.isShowEdit"
                class="w-auto border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-plus"></i>
                Thêm
            </button>
            <div class="flex gap-2" v-else>
                <button type="button" @click="cancelSubmit"
                    class="w-auto border py-1 px-2 rounded-lg bg-red-500 hover:bg-red-400 flex items-center gap-2 text-gray-600">
                    <i class="fa-solid fa-xmark"></i>
                    Hủy
                </button>
                <button type="submit"
                    class="w-auto border py-1 px-2 rounded-lg bg-sky-500 hover:bg-sky-400 flex items-center gap-2 text-gray-600">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Cập nhật
                </button>
            </div>
        </div>
    </form>
</template>