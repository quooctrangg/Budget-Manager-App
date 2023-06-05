<script setup>
import { ref } from 'vue'
import { useNavbarStore } from '../stores/navbar.store'
import { useUserStore } from '../stores/user.store'
import { useToast } from 'vue-toast-notification'

const navbarStore = useNavbarStore()
const userStore = useUserStore()
const $toast = useToast();

const data = ref({
    oldpassword: '',
    newpassword: ''
})
const repassword = ref('')
const passwordErr = ref(false)

const submitChangePassword = async () => {
    if (data.value.newpassword !== repassword.value) passwordErr.value = true
    else passwordErr.value = false

    if (!passwordErr.value) {
        await userStore.changPassword(data.value)
        if (userStore.err) {
            $toast.error(userStore.err, { position: 'top-right' })
            return
        }
        $toast.success(userStore.result.message, { position: 'top-right' })
        navbarStore.isShow = false
    }
}
</script>
<template>
    <div class="absolute top-0 left-0 bg-black bg-opacity-20 h-full w-full flex justify-center items-center">
        <div class="rounded-xl border-[3px] border-white bg-slate-100 p-2">
            <div class="flex justify-between">
                <h1 class="text-base text-red-500 font-bold mb-2">Đổi mật khẩu</h1>
                <i class="fa-solid fa-xmark cursor-pointer text-red-500" @click="navbarStore.changeIsShow"></i>
            </div>
            <form class="flex flex-col gap-5" @submit.prevent="submitChangePassword">
                <input type="password" placeholder="Mật khẩu hiện tại" v-model="data.oldpassword" required minlength="6"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <input type="password" placeholder="Mật khẩu mới" v-model="data.newpassword" required minlength="6"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <input type="password" placeholder="Nhập lại mật khẩu mới" v-model="repassword" required minlength="6"
                    class="rounded-md border-[3px] border-white bg-slate-100 h-[100%] w-full p-2 focus:border-green-500 outline-0 text-base">
                <span class="text-red-600 text-xs" v-show="passwordErr">Mật khẩu không khớp!</span>
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