import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const user = ref(null)

    const clearSession = () => {
        sessionStorage.removeItem('user');
    }

    return { user, clearSession }
}, {
    persist: {
        key: 'user',
        storage: sessionStorage
    }
})