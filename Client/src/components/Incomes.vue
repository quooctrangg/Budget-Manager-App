<script setup>
import FormAdd from '../components/FormAdd.vue'
import Card from '../components/Card.vue'
</script>
<template>
    <h1 class="text-2xl font-bold text-indigo-900">Thu Nhập</h1>
    <div class="w-full h-[100%] mt-2">
        <div class="w-[100%] border-[3px] border-white rounded-xl bg-slate-100 text-center p-4">
            <h3 class="text-indigo-900">Tổng thu nhập: <span class="text-lime-500 font-bold">10.000.000đ</span></h3>
        </div>
        <div class="w-full h-[100%] flex mt-5 gap-3">
            <div class="w-[30%] h-full">
                <FormAdd />
            </div>
            <div class="w-[70%] h-[80%] overflow-auto">
                <Card v-for="t in 10" :key="t" />
            </div>
        </div>
    </div>
</template>