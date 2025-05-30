import {defineStore} from "pinia";
import {ref} from "vue";
import {usePaginationStore} from "@/stores/PaginationStore.js";

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([])
  const movie = ref({})
  // общее количество страниц результата поиска
  const totalPages = ref(0)
  const isLoading = ref(false)
  const errorMessage = ref('')
  const isError = ref(false)
  // общее количество фильмов результата поиска
  const totalResults = ref(0)
  const paginationStore = usePaginationStore()

  // получить фильмы по значению поиска (первая страница)
  async function getMoviesBySearch(searchValue) {
    try {
      isLoading.value = true
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchValue}&page=1`)
      const result = await data.json()
      if(result.Response === "False") {
        totalResults.value = 0
        totalPages.value = 0
        movies.value = []
        errorMessage.value = result.Error
        isLoading.value = false
        isError.value = true
      } else {
        totalResults.value = result.totalResults
        movies.value = result.Search
        totalPages.value = Math.ceil(result.totalResults / 10)
        // обновить пагинацию
        paginationStore.pagination()
        isLoading.value = false
      }
    } catch (e) {
      console.log(e)
    }
  }
  // получить фильмы по значению поиска и номеру страницы
  async function getMoviesByPage(pageNumber, searchValue) {
    try {
      isLoading.value = true
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchValue}&page=${pageNumber}`)
      const result = await data.json()
      movies.value = result.Search
      totalPages.value = Math.ceil(result.totalResults / 10)
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }
  // получить информацию о конкретном фильме по ID
  async function getMoviesByID(id) {
    try {
      isLoading.value = true
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${id}&plot=full`)
      const result = await data.json()
      movie.value = result
      isLoading.value = false
      return result
    } catch (e) {
      console.log(e)
    }
  }

  return {movies,getMoviesBySearch,totalPages,getMoviesByPage,isLoading,errorMessage,isError,totalResults,getMoviesByID,movie}
})
