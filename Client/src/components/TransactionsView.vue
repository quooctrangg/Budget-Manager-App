<script setup>
import { onMounted, ref, watch } from 'vue'
import { useTransactionStore } from '../stores/transaction.store'
import { useToast } from 'vue-toast-notification'
import { useCategoryStore } from '../stores/category.store'
import Loading from './Loading.vue'
import Card from '../components/Card.vue'
import moment from 'moment'

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const $toast = useToast();

const select = ref({
    date: 'all',
    type: 'all',
    categoryId: 'all',
    sort: -1,
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD')
})
const transaction = ref(null)
const categorys = ref([])
const totalIncomes = ref(0)
const totalExpenses = ref(0)
const totalBalance = ref(0)

const getTransaction = async () => {
    transaction.value = null
    await transactionStore.findAllTransactionByUserId(select.value)
    if (transactionStore.err) {
        $toast.error(transactionStore.err, { position: 'top-right' })
        return
    }
    transaction.value = transactionStore.result.data
    totalExpenses.value = transactionStore.sumAmount(transactionStore.filerByType(transaction.value, -1))
    totalIncomes.value = transactionStore.sumAmount(transactionStore.filerByType(transaction.value, 1))
    totalBalance.value = totalExpenses.value + totalIncomes.value
}

const findAllCategorys = async (type) => {
    await categoryStore.findAllCategorys(type)
    if (categoryStore.err) {
        $toast.error(categoryStore.err, { position: 'top-right' })
        return
    }
    categorys.value = categoryStore.result.data
}

watch(() => select.value.type, async () => {
    if (select.value.type == 'all') {
        categorys.value = []
        select.value.categoryId = 'all'
    } else {
        await findAllCategorys(select.value.type)
    }
})

onMounted(() => {
    getTransaction()
})
</script>
<template>
    <section class="w-full h-[100%] flex flex-col">
        <div
            class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4 flex justify-around max-sm:text-sm">
            <h3 class="text-indigo-900">Tổng thu nhập:
                <span class="text-green-500 font-bold">
                    {{ Number(totalIncomes).toLocaleString('de-DE') + ' VNĐ' }}
                </span>
            </h3>
            <h3 class="text-indigo-900">Tổng chi tiêu:
                <span class="text-red-500 font-bold">
                    {{ Number(totalExpenses).toLocaleString('de-DE') + ' VNĐ' }}
                </span>
            </h3>
            <h3 class="text-indigo-900">Tổng số dư:
                <span class="font-bold text-blue-500">
                    {{ Number(totalBalance).toLocaleString('de-DE') + ' VNĐ' }}
                </span>
            </h3>
        </div>
        <div class="w-full h-[100%] flex mt-5 gap-3 max-sm:flex-col max-sm:mt-2">
            <div class="w-[40%] h-full max-sm:w-full max-sm:flex-1">
                <form class="flex flex-col gap-2 text-base max-sm:gap-1 max-sm:h-full max-sm:text-sm"
                    @submit.prevent="getTransaction">
                    <div>
                        <div>
                            <label class="">Thời gian:</label>
                            <select v-model="select.date"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0">
                                <option value="all">Tất cả</option>
                                <option value="1day">1 ngày qua</option>
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                                <option class="max-sm:hidden" value="other">Tùy chỉnh...</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-center gap-2" v-if="select.date === 'other'">
                            <div>
                                <label class="text-sm">Từ ngày:</label>
                                <input type="date" v-model="select.startDate" :max="select.endDate" required
                                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0  text-gray-600">
                            </div>
                            <div>
                                <label class="text-sm">Đến ngày:</label>
                                <input type="date" v-model="select.endDate" :min="select.startDate" required
                                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-1 focus:border-green-500 outline-0  text-gray-600">
                            </div>
                        </div>
                        <div>
                            <label class="">Giao dịch:</label>
                            <select v-model="select.type"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 ">
                                <option value="all">Tất cả</option>
                                <option value="1">Thu nhập</option>
                                <option value="-1">Chi tiêu</option>
                            </select>
                        </div>
                        <div>
                            <label class="">Phân loại:</label>
                            <select v-model="select.categoryId"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 ">
                                <option value="all">Tất cả</option>
                                <option v-for="category in categorys" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="">Sắp xếp:</label>
                            <select v-model="select.sort"
                                class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 w-full p-2 focus:border-green-500 outline-0 ">
                                <option value="-1">Ngày giảm dần</option>
                                <option value="1">Ngày tăng dần</option>
                            </select>
                        </div>
                        <div>
                            <button type="submit"
                                class="w-full border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center justify-center gap-2 text-gray-600 mt-5 max-sm:mt-2">
                                <i class="fa-solid fa-filter"></i>
                                Lọc
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="w-[60%] overflow-auto max-sm:w-full max-sm:flex-1">
                <Loading v-if="transactionStore.isLoading" />
                <Card v-else v-for="item in transaction" :transaction="item" :key="item._id" :del="'no'"
                    @submitEvent="getTransaction" />
                <div v-if="transaction == null || transaction?.length == 0"
                    class="w-full h-full flex justify-center items-center">
                    <span class="text-xl text-red-500 font-bold">Không có giao dịch!</span>
                </div>
            </div>
        </div>
    </section>
</template>