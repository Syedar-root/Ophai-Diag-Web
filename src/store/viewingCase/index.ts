import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useViewCaseStore = defineStore(
  'viewCase',
  () => {
    const viewCase = ref<{ id: string }>({
      id: ''
    })

    function setViewCase(newViewCase: any) {
      viewCase.value = newViewCase
    }
    return { viewCase, setViewCase }
  },
  {
    persist: true
  }
)
