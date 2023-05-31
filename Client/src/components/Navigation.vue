<script setup>
import { ref } from 'vue'

const navbarItems = [
    { id: 0, name: 'Tổng quan', icon: 'fa-solid fa-chart-pie', router: 'dashboard' },
    { id: 1, name: 'Xem giao dịch', icon: 'fa-regular fa-credit-card', router: 'viewtransactions' },
    { id: 2, name: 'Thu nhập', icon: 'fa-solid fa-money-bill-trend-up', router: 'incomes' },
    { id: 3, name: 'Chi tiêu', icon: 'fa-solid fa-hand-holding-dollar', router: 'expenses' }
]

const selectedItem = ref(0)

const selectNavbarItem = (item) => {
    selectedItem.value = item;
}

</script>
<template>
    <div
        class="rounded-xl border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50 flex flex-col justify-between py-3">
        <div class="h-auto">
            <div class="h-auto border-b-[2px] mt-2">
                <div class="w-[50%] m-auto h-auto">
                    <img src="logo.png" alt="logo">
                </div>
                <p class="text-center h-auto">Xin chào, quoctrang</p>
            </div>
            <nav class="h-auto flex flex-col gap-5 mt-5 px-5">
                <router-link v-for="item in navbarItems" :key="item.id" :to="{ name: '' }" class="h-auto"
                    @click="selectNavbarItem(item.id)" :class="{ 'text-indigo-900': item.id === selectedItem }">
                    <span v-if="item.id === selectedItem" class="border-l-[4px] border-indigo-900 rounded-xl mr-2"></span>
                    <i :class="item.icon" class="h-auto w-auto"></i>
                    {{ item.name }}
                </router-link>
            </nav>
        </div>
        <button class="h-auto text-red-600">
            <i class="fa-solid fa-right-from-bracket h-auto w-auto"></i>
            Đăng xuất
        </button>
    </div>
</template>