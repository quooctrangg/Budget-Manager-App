import { defineStore } from 'pinia'
import { ref } from 'vue'

import authService from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
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
            user.value = res.data
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

    return { err, result, user, register, login, logout }
})