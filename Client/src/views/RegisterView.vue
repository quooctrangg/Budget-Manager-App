<script setup>

</script>
<template>
    <section>
        <div class="flex items-center justify-center px-6 py-8 opacity-70">
            <div class="shadow w-[25%] rounded-lg">
                <div class="p-6 bg-white rounded-lg">
                    <h1 class="text-xl font-bold text-center text-indigo-900">
                        ĐĂNG KÝ
                    </h1>
                    <form class="space-y-2" @submit.prevent="">
                        <div>
                            <label for="email" class="block text-xs font-medium text-gray-900">
                                Email
                            </label>
                            <input type="email" name="email" id="email" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5 focus:outline-teal-500">
                        </div>
                        <div>
                            <label for="password" class="block text-xs font-medium text-gray-900">
                                Mật khẩu
                            </label>
                            <input type="password" name="password" id="password" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5  focus:outline-teal-500">
                        </div>
                        <div>
                            <label for="password" class="block text-xs font-medium text-gray-900">
                                Nhập lại mật khẩu
                            </label>
                            <input type="password" name="password" id="password" required
                                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-1.5  focus:outline-teal-500">
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