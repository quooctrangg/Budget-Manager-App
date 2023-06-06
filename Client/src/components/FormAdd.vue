<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useTransactionStore } from '../stores/transaction.store'
import { useUserStore } from '../stores/user.store'

const transactionStore = useTransactionStore()
const userStore = useUserStore()
const $toast = useToast();

const props = defineProps(['type'])
const emits = defineEmits(['submitEvent'])


const data = ref({
    userId: userStore.user._id,
    amount: '',
    date: '',
    type: props.type,
    category: '',
    note: ''
})

const submitTransaction = async () => {
    if (!transactionStore.isShowEdit) {
        await transactionStore.createTransaction(data.value)
    }
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    $toast.success(transactionStore.result.message, { position: 'top-right' })
    emits('submitEvent')
    data.value.amount = ''
    data.value.date = ''
    data.value.category = ''
    data.value.note = ''
}


</script>
<template>
    <form class="w-full  flex flex-col gap-3" @submit.prevent="submitTransaction">
        <input type="number" required v-model="data.amount"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"
            placeholder="Số tiền">
        <input type="date" required v-model="data.date"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
        <select v-model="data.category"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
            <option value="">Chọn</option>
            <option value="Giải trí">Giải trí</option>
            <option value="Sức khỏe">Sức khỏe</option>
            <option value="Học tập">Học tập</option>
            <option value="Ăn uống">Ăn uống</option>
            <option value="Di chuyển">Di chuyển</option>
            <option value="Lương">Lương</option>
            <option value="Quà tặng">Quà tặng</option>
            <option value="Khác">Khác</option>
        </select>
        <textarea rows="5" placeholder="Ghi chú" maxlength="100" v-model="data.note"
            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base"></textarea>
        <div class="w-full flex justify-center">
            <button type="submit" v-if="!transactionStore.isShowEdit"
                class="w-auto border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center gap-2 text-gray-700">
                <i class="fa-solid fa-plus"></i>
                Thêm
            </button>
            <div class="flex gap-2" v-else>
                <button type="button" @click="transactionStore.isShowEdit = false"
                    class="w-auto border py-1 px-2 rounded-lg bg-red-600 hover:bg-red-400 flex items-center gap-2 text-gray-700">
                    <i class="fa-solid fa-xmark"></i>
                    Hủy
                </button>
                <button type="submit"
                    class="w-auto border py-1 px-2 rounded-lg bg-orange-600 hover:bg-orange-400 flex items-center gap-2 text-gray-700">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Cập nhật
                </button>
            </div>
        </div>
    </form>
</template>