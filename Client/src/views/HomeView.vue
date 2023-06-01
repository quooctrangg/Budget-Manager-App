<script setup>
import Navigation from '../components/Navigation.vue';
import Main from '../components/Main.vue'
</script>
<template>
    <div class="flex gap-5 p-5 m-auto h-[100vh]">
        <Navigation class="w-[20%]" />
        <Main class="w-[80%] rounded-xl border-[3px] border-white bg-slate-100 h-[100%] bg-opacity-50" />
    </div>
</template>
