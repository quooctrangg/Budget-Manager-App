<script setup>
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { useNavbarStore } from '../stores/navbar.store'
import { useAuthStore } from '../stores/auth.store'
import { useUserStore } from '../stores/user.store'

const router = useRouter()
const $toast = useToast();
const navbarStore = useNavbarStore()
const userStore = useUserStore()
const authStore = useAuthStore()

const selectNavbarItem = (item) => {
    navbarStore.activeIndex = item;
}

const submitLogout = async () => {
    await authStore.logout()
    if (authStore.err) {
        $toast.error(authStore.err, { position: 'top-right' })
        return
    }
    userStore.clearSession()
    $toast.success(authStore.result.message, { position: 'top-right' })
    router.push({ name: 'login' })
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
                <p class="text-center h-auto">Xin chào, {{ userStore.nameFilter() }}</p>
            </div>
            <nav class="h-auto flex flex-col gap-5 mt-5 px-5">
                <router-link v-for="item in navbarStore.navbarItems" :key="item.id" :to="{ name: '' }" class="h-auto w-full"
                    @click="selectNavbarItem(item.id)" :class="{ 'text-indigo-900': item.id === navbarStore.activeIndex }">
                    <span v-if="item.id === navbarStore.activeIndex"
                        class="border-l-[4px] border-indigo-900 rounded-xl mr-2"></span>
                    <i :class="item.icon" class="h-auto w-auto"></i>
                    {{ item.name }}
                </router-link>
            </nav>
        </div>
        <div class="flex gap-10 p-2 justify-center items-center">
            <button @click="navbarStore.changeIsShow">
                <i class="fa-solid fa-gear"></i>
            </button>
            <button class="h-auto text-red-600" @click="submitLogout">
                <i class="fa-solid fa-right-from-bracket h-auto w-auto"></i>
                Đăng xuất
            </button>
        </div>
    </div>
</template>