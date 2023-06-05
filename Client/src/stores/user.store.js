import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    const clearSession = () => {
        sessionStorage.removeItem('user');
    }

    const nameFilter = () => {
        let name = user.value.email || ''
        return name.slice(0, name.indexOf('@'))
    }

    return { user, clearSession, nameFilter }
}, {
    persist: {
        key: 'user',
        storage: sessionStorage
    }
})