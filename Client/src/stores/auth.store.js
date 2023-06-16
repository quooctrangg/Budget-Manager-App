import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCookies } from "vue3-cookies"
import { useUserStore } from '../stores/user.store'
import jwt_decode from 'jwt-decode'

import authService from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
    const { cookies } = useCookies()
    const router = useRouter()
    const userStore = useUserStore()

    const err = ref(null)
    const result = ref(null)
    const user = ref(null)

    const register = async data => {
        err.value = null
        result.value = null
        try {
            let res = await authService.register(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const login = async data => {
        err.value = null
        result.value = null
        try {
            let res = await authService.login(data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const logout = async () => {
        err.value = null
        result.value = null
        try {
            let res = await authService.logout()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    const checkToken = () => {
        const token = cookies.get('Token')
        if (token) {
            const decoded = jwt_decode(token)
            if (decoded.exp < Date.now() / 1000) {
                cookies.remove('Token')
                userStore.clearSession()
                router.push({ name: 'login' })
            }
        } else {
            router.push({ name: 'login' })
            userStore.clearSession()
        }
    }

    return { err, result, user, register, login, logout, checkToken }
})