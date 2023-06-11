import { defineStore } from 'pinia'
import { ref } from 'vue'

import categoryService from '../services/category.service'

export const useCategoryStore = defineStore('category', () => {
    const err = ref(null)
    const result = ref(null)

    const findAllCategorys = async data => {
        err.value = null
        result.value = null
        try {
            let res = await categoryService.findAllCategorys()
            if (res.code !== 200) throw new Error(res.message)
            result.value = res
        } catch (error) {
            err.value = error.message
        }
    }

    return { err, result, findAllCategorys }
})