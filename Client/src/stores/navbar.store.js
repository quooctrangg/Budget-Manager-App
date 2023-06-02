import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavbarStore = defineStore('navbar', () => {
    const activeIndex = ref(0)
    const isShow = ref(false)
    const navbarItems = [
        { id: 0, name: 'Tổng quan', icon: 'fa-solid fa-chart-pie', component: 'Dashboard' },
        { id: 1, name: 'Xem giao dịch', icon: 'fa-regular fa-credit-card', component: 'TransactionsView' },
        { id: 2, name: 'Thu nhập', icon: 'fa-solid fa-money-bill-trend-up', component: 'Incomes' },
        { id: 3, name: 'Chi tiêu', icon: 'fa-solid fa-hand-holding-dollar', component: 'Expenses' }
    ]

    const changeIsShow = () => {
        isShow.value = !isShow.value
    }

    return { activeIndex, navbarItems, isShow, changeIsShow }
})