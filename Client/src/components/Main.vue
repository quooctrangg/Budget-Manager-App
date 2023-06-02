<script setup>
import { useNavbarStore } from '../stores/navbar.store'

import Dashboard from '../components/Dashboard.vue';
import Expenses from '../components/Expenses.vue';
import Incomes from '../components/Incomes.vue';
import TransactionsView from '../components/TransactionsView.vue';
import ChangePasswordForm from './ChangePasswordForm.vue';

const navbarStore = useNavbarStore()
</script>
<template>
    <div class="p-3 relative">
        <Dashboard v-if="navbarStore.activeIndex === 0" />
        <TransactionsView v-if="navbarStore.activeIndex === 1" />
        <Incomes v-if="navbarStore.activeIndex === 2" />
        <Expenses v-if="navbarStore.activeIndex === 3" />
        <ChangePasswordForm v-if="navbarStore.isShow" v-show="navbarStore.isShow" />
    </div>
</template>