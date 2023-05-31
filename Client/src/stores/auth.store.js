import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    return {}
}, {
    persist: {
        key: 'auth-store',
        storage: sessionStorage
    }
})