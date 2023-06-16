<script setup>
import { onMounted } from 'vue';
import { useNavbarStore } from '../stores/navbar.store'
import { useAuthStore } from '../stores/auth.store'
import Dashboard from '../components/Dashboard.vue';
import Expenses from '../components/Expenses.vue';
import Incomes from '../components/Incomes.vue';
import TransactionsView from '../components/TransactionsView.vue';
import ChangePasswordForm from './ChangePasswordForm.vue';

const navbarStore = useNavbarStore()
const authStore = useAuthStore()

onMounted(() => {
    setInterval(() => {
        authStore.checkToken()
    }, 60000)
})
</script>
<template>
    <div class="p-3 relative">
        <Dashboard v-if="navbarStore.activeIndex === 0" class="h-[100%]" />
        <TransactionsView v-if="navbarStore.activeIndex === 1" />
        <Incomes v-if="navbarStore.activeIndex === 2" />
        <Expenses v-if="navbarStore.activeIndex === 3" />
        <ChangePasswordForm v-if="navbarStore.isShow" v-show="navbarStore.isShow" />
    </div>
</template>