import {defineStore} from "pinia";
import {ref} from "vue";

export const useFilterStore = defineStore('filter', () => {
  const filterValue = ref('all')
  return {filterValue}
})
