<script setup>
import { useNavbarStore } from '../stores/navbar.store'

import Dashboard from '../components/Dashboard.vue';
import Expenses from '../components/Expenses.vue';
import Incomes from '../components/Incomes.vue';
import TransactionsView from '../components/TransactionsView.vue';

const navbarStore = useNavbarStore()
</script>
<template>
    <div class="p-2">
        <Dashboard v-if="navbarStore.activeIndex === 0" />
        <TransactionsView v-if="navbarStore.activeIndex === 1" />
        <Incomes v-if="navbarStore.activeIndex === 2" />
        <Expenses v-if="navbarStore.activeIndex === 3" />
    </div>
</template>