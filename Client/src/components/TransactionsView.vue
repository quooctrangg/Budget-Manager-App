<script setup>
import Loading from './Loading.vue'
import Card from '../components/Card.vue'
import { onMounted, ref } from 'vue'
import { useTransactionStore } from '../stores/transaction.store'
import { useUserStore } from '../stores/user.store'
import { useToast } from 'vue-toast-notification'

const transactionStore = useTransactionStore()
const userStore = useUserStore()
const $toast = useToast();

const select = ref({
    date: 'all',
    type: 'all',
    category: 'all',
    sort: 1,
    startDate: '',
    endDate: ''
})
const transaction = ref(null)
const total = ref(0)

const getTransaction = async () => {
    transaction.value = null
    await transactionStore.findAllTransactionByUserId(userStore.user._id, select.value)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    transaction.value = transactionStore.result.data
    total.value = transactionStore.totalBalance(transaction.value)
}

onMounted(() => {
    getTransaction()
})

</script>
<template>
    <h1 class="text-2xl font-bold text-indigo-900">Tất Cả Giao Dịch</h1>
    <div class="w-full h-[100%] mt-2">
        <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4">
            <h3 class="text-indigo-900">Tổng số dư:
                <span :class="total >= 0 ? 'text-green-500' : 'text-red-500'" class="font-bold">
                    {{ Number(total).toLocaleString('de-DE', {
                        style: 'currency', currency: 'VND'
                    }) }}
                </span>
            </h3>
        </div>
        <div class="w-full h-[100%] flex mt-5 gap-3">
            <div class="w-[40%] h-full">
                <form class="flex flex-col gap-2" @submit.prevent="getTransaction">
                    <div>
                        <label class="text-base">Thời gian:</label>
                        <select v-model="select.date"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="all">Tất cả</option>
                            <option value="1day">1 ngày qua</option>
                            <option value="7days">7 ngày qua</option>
                            <option value="30days">30 ngày qua</option>
                            <option value="other">Tùy chỉnh...</option>
                        </select>
                    </div>
                    <div class="flex items-center justify-center gap-2" v-if="select.date === 'other'">
                        <div>
                            <label class="text-sm">Từ ngày:</label>
                            <input type="date" v-model="select.startDate"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0 text-base text-gray-400">
                        </div>
                        <div>
                            <label class="text-sm">Đến ngày:</label>
                            <input type="date" v-model="select.endDate"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0 text-base text-gray-400">
                        </div>
                    </div>
                    <div>
                        <label class="text-base">Giao dịch:</label>
                        <select v-model="select.type"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="all">Tất cả</option>
                            <option value="incomes">Thu nhập</option>
                            <option value="expenses">Chi tiêu</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-base">Phân loại:</label>
                        <select v-model="select.category"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="all">Tất cả</option>
                            <option value="Giải trí">Giải trí</option>
                            <option value="Sức khỏe">Sức khỏe</option>
                            <option value="Học tập">Học tập</option>
                            <option value="Ăn uống">Ăn uống</option>
                            <option value="Di chuyển">Di chuyển</option>
                            <option value="Lương">Lương</option>
                            <option value="Quà tặng">Quà tặng</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-base">Sắp xếp:</label>
                        <select v-model="select.sort"
                            class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 text-base">
                            <option value="1">Tăng dần</option>
                            <option value="-1">Giảm dần</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center justify-center gap-2 text-gray-700 text-base mt-5">
                            <i class="fa-solid fa-filter"></i>
                            Lọc
                        </button>
                    </div>
                </form>
            </div>
            <div class="w-[60%] h-[80%] overflow-auto">
                <Loading v-if="transactionStore.isLoading" />
                <Card v-else v-for="item in transaction" :transaction="item" :key="item._id" :del="'no'"
                    @submitEvent="getTransaction" />
                <div v-if="transaction == null" class="w-full h-full flex justify-center items-center">
                    <span class="text-xl text-red-500 font-bold">Không có giao dịch!</span>
                </div>
            </div>
        </div>
    </div>
</template>