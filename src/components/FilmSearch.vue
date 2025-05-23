<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {ref, watch} from "vue";
import debounce from "@/utils/debounce.js";

const movie = ref('')
const movieStore = useMovieStore()
const isError = ref(false)

watch(movie, debounce((newMovie) => {
  if(newMovie.length > 2) {
    isError.value = false
    movieStore.getMoviesBySearch(newMovie)
  } else if(newMovie.length === 0) {
    isError.value = false
    movieStore.movies = []
  } else {
    movieStore.movies = []
    isError.value = true
  }
}, 1000))
</script>

<template>
  <div class="relative">
    <input class="bg-gray-700 p-3 rounded-2xl w-full placeholder:text-gray-400 font-medium text-lg pl-8 text-gray-300" type="text" placeholder="Search" v-model="movie">
    <svg class="absolute top-[25%] right-5 w-6" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="stroke-gray-400" cx="7.57177" cy="7.4819" rx="7.57177" ry="7.4819" transform="matrix(-1 0 0 1 17.178 1)" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="stroke-gray-400" d="M4.33984 14.0743L1.37128 17" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <Transition>
    <div class="bg-red-500 text-gray-800 text-lg font-medium rounded-xl p-2 pl-8 mt-2" v-if="isError">Длина названия фильма должна быть не менее 3 символов</div>
  </Transition>
</template>

<style scoped>

</style>
