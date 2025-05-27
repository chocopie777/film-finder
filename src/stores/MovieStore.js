import {defineStore} from "pinia";
import {ref} from "vue";

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([])
  const totalPages = ref(0)
  const currentPageNumber = ref(1)
  const isLoading = ref(false)
  const errorMessage = ref('')
  const isError = ref(false)
  const totalResults = ref(0)

  async function getMoviesBySearch(searchValue) {
    try {
      isLoading.value = true
      currentPageNumber.value = 1
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchValue}&page=${currentPageNumber.value}`)
      const result = await data.json()
      console.log(result)
      if(result.Response === "False") {
        totalPages.value = 0
        movies.value = []
        errorMessage.value = result.Error
        isLoading.value = false
        isError.value = true
      } else {
        totalResults.value = result.totalResults
        movies.value = result.Search
        totalPages.value = Math.ceil(result.totalResults / 10)
        isLoading.value = false
      }
    } catch (e) {
      console.log(e)
    }
  }
  async function getMoviesByPage(pageNumber, searchValue) {
    try {
      isLoading.value = true
      currentPageNumber.value = pageNumber
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchValue}&page=${pageNumber}`)
      const result = await data.json()
      movies.value = result.Search
      totalPages.value = Math.ceil(result.totalResults / 10)
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }
  async function getMoviesByID(id) {
    try {
      isLoading.value = true
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${id}&plot=full`)
      const result = await data.json()
      console.log(result)
      isLoading.value = false
    } catch (e) {
      console.log(e)
    }
  }

  return {movies,getMoviesBySearch,totalPages,getMoviesByPage,currentPageNumber,isLoading,errorMessage,isError,totalResults,getMoviesByID}
})
