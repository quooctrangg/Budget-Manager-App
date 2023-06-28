<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useUserStore } from '../stores/user.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast();
const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const user = ref({
    email: '',
    password: ''
})

const submitLogin = async () => {
    await authStore.login(user.value)
    if (authStore.err) {
        $toast.error(authStore.err, { position: 'top-right' })
        return
    }
    const { __v, token, createdAt, updatedAt, ...other } = authStore.result.data
    userStore.user = { ...other }
    $toast.success(authStore.result.message, { position: 'top-right' })
    router.push({ name: 'home' })
}

</script>
<template>
    <section>
        <div class="flex items-center justify-center px-6 py-8">
            <div class="shadow w-[25%] rounded-lg overflow-hidden max-sm:w-[50%]">
                <div class="p-6 bg-white bg-opacity-50">
                    <h1 class="text-xl font-bold text-center text-indigo-900 max-lg:text-base">
                        ĐĂNG NHẬP
                    </h1>
                    <form class="space-y-3" @submit.prevent="submitLogin">
                        <div>
                            <label for="email" class="block text-xs font-medium text-gray-900">
                                Email
                            </label>
                            <input type="email" name="email" id="email" required maxlength="50" v-model="user.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5 focus:outline-teal-500">
                        </div>
                        <div>
                            <label for="password" class="block text-xs font-medium text-gray-900">
                                Mật khẩu
                            </label>
                            <input type="password" name="password" id="password" required minlength="6"
                                v-model="user.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5  focus:outline-teal-500">
                        </div>
                        <button type="submit"
                            class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-700 hover:bg-indigo-500 text-white font-medium">
                            Đăng nhập
                        </button>
                        <p class="text-xs font-light text-gray-500">
                            Bạn chưa có tài khoản?
                            <router-link class="font-medium text-sky-500 underline hover:text-red-600"
                                :to="{ name: 'register' }">
                                Đăng ký
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>