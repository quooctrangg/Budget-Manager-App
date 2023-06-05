import { defineStore } from 'pinia'
import { ref } from 'vue'
import userService from '../services/user.service'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)
    const err = ref(null)
    const result = ref(null)

    const clearSession = () => {
        sessionStorage.removeItem('user');
    }

    const nameFilter = () => {
        let name = user.value.email || ''
        return name.slice(0, name.indexOf('@'))
    }

    const changPassword = async (data) => {
        err.value = null
        result.value = null
        try {
            let res = await userService.changPassword(user.value._id, data)
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    return { user, result, err, clearSession, nameFilter, changPassword }
}, {
    persist: {
        key: 'user',
        storage: sessionStorage
    }
})