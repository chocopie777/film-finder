import {defineStore} from "pinia";
import {ref} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";

export const usePaginationStore = defineStore('pagination', () => {
  const movieStore = useMovieStore()
  // текущий номер страницы
  const currentPageNumber = ref(1)
  // диапазон номеров страниц пагинации
  const pageNumberRange = ref([])

  // Вычисление пагинации
  function pagination() {
    const arr = [];
    // Если страниц больше 10, то добавлять динамически отступы слева(5) и справа(4) (отображать одновременно не более 10 страницы за раз), Иначе отобразить все страницы которых меньше или равно 10 штук
    if(movieStore.totalPages >= 10) {
      if(currentPageNumber.value < 7) {
        for (let i = 1; i <= 10; i++) {
          arr.push(i);
        }
      } else if(currentPageNumber.value + 4 >= movieStore.totalPages) {
        for (let i = currentPageNumber.value - (9 - (movieStore.totalPages - currentPageNumber.value)); i <= currentPageNumber.value + (movieStore.totalPages - currentPageNumber.value); i++) {
          arr.push(i);
        }
      } else {
        for (let i = currentPageNumber.value - 5; i <= currentPageNumber.value + 4; i++) {
          arr.push(i);
        }
      }
    } else {
      for (let i = 1; i <= movieStore.totalPages; i++) {
        arr.push(i);
      }
    }
    pageNumberRange.value = arr
  }

  return {currentPageNumber, pageNumberRange, pagination}
})
