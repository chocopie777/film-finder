import {defineStore} from "pinia";
import {ref} from "vue";

export const useMovieStore = defineStore('movie', () => {
  const movies = ref([])

  async function getMoviesBySearch(searchValue) {
    try {
      const data = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchValue}&page=1`);
      const result = await data.json()
      console.log(result)
      movies.value = result.Search
    } catch (e) {
      console.log(e)
    }
  }

  return {movies,getMoviesBySearch}
})
