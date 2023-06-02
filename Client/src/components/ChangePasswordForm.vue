<script setup>
import { useNavbarStore } from '../stores/navbar.store'

const navbarStore = useNavbarStore()
</script>
<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center">
        <div class="rounded-xl border-[3px] border-white bg-slate-100 p-2">
            <div class="flex justify-between">
                <h1 class="text-base text-red-500 font-bold mb-2">Đổi mật khẩu</h1>
                <i class="fa-solid fa-xmark cursor-pointer text-red-500" @click="navbarStore.changeIsShow"></i>
            </div>
            <form class="flex flex-col gap-5">
                <input type="text" placeholder="Mật khẩu hiện tại"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <input type="text" placeholder="Mật khẩu mới"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <input type="text" placeholder="Nhập lại mật khẩu mới"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <div class="flex gap-2 justify-center items-center">
                    <button type="button" @click="navbarStore.changeIsShow"
                        class="w-auto border py-1 px-2 rounded-lg bg-red-500 hover:bg-red-300 flex items-center gap-2 text-gray-700 text-base">
                        <i class="fa-solid fa-xmark"></i>
                        Hủy
                    </button>
                    <button type="submit"
                        class="w-auto border py-1 px-2 rounded-lg bg-green-500 hover:bg-green-300 flex items-center gap-2 text-gray-700 text-base">
                        <i class="fa-solid fa-check"></i>
                        Đổi
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>