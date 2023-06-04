<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useToast } from 'vue-toast-notification'

const $toast = useToast();
const router = useRouter()
const authStore = useAuthStore()

const user = ref({
    email: '',
    password: ''
})
const passwordErr = ref(false)
const repassword = ref('')

const submitRegister = async () => {
    if (user.value.password !== repassword.value) passwordErr.value = true
    else passwordErr.value = false

    if (!passwordErr.value) {
        await authStore.register(user.value)
        if (authStore.err) {
            $toast.error(authStore.err, { position: 'top-right' })
            return
        }
        $toast.success(authStore.result.message, { position: 'top-right' })
        router.push({ name: 'login' })
    }
}
</script>
<template>
    <section>
        <div class="flex items-center justify-center px-6 py-8">
            <div class="shadow w-[25%] rounded-lg overflow-hidden">
                <div class="p-6 bg-white bg-opacity-50">
                    <h1 class="text-xl font-bold text-center text-indigo-900">
                        ĐĂNG KÝ
                    </h1>
                    <form class="space-y-2" @submit.prevent="submitRegister">
                        <div>
                            <label for="email" class="block text-xs font-medium text-gray-900">
                                Email
                            </label>
                            <input type="email" name="email" id="email" required v-model="user.email" maxlength="50"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5 focus:outline-teal-500">
                        </div>
                        <div>
                            <label for="password" class="block text-xs font-medium text-gray-900">
                                Mật khẩu
                            </label>
                            <input type="password" name="password" id="password" required v-model="user.password"
                                minlength="6"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5  focus:outline-teal-500">
                        </div>
                        <div>
                            <label for="repassword" class="block text-xs font-medium text-gray-900">
                                Nhập lại mật khẩu
                            </label>
                            <input type="password" name="repassword" id="repassword" required v-model="repassword"
                                minlength="6"
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5  focus:outline-teal-500">
                            <span class="text-red-600 text-xs" v-if="passwordErr">Mật khẩu không khớp!</span>
                        </div>
                        <button type="submit"
                            class="w-full rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-700 hover:bg-indigo-500 text-white font-medium">
                            Tạo tài khoản
                        </button>
                        <p class="text-xs font-light text-gray-500">
                            Đã có tài khoản?
                            <router-link class="font-medium text-primary-600 hover:underline hover:text-red-600"
                                :to="{ name: 'login' }">
                                Đăng nhập
                            </router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>