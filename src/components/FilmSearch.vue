<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {watch} from "vue";
import debounce from "@/utils/debounce.js";
import {useSearchStore} from "@/stores/SearchStore.js";
import {usePaginationStore} from "@/stores/PaginationStore.js";

const movieStore = useMovieStore()
const searchStore = useSearchStore()
const paginationStore = usePaginationStore()

watch(() => searchStore.searchValue, debounce((newMovie) => {
  //указать текущий номер страницы - 1 для каждого последующего нового поиска фильмов
  paginationStore.currentPageNumber = 1
  if(newMovie.length > 2) {
    movieStore.isError = false
    movieStore.getMoviesBySearch(newMovie)
  } else if(newMovie.length === 0) {
    movieStore.isError = false
    movieStore.movies = []
    movieStore.totalPages = 0
    movieStore.totalResults = 0
  } else {
    movieStore.errorMessage = 'Длина названия фильма должна быть не менее 3 символов'
    movieStore.isError = true
    movieStore.movies = []
    movieStore.totalPages = 0
    movieStore.totalResults = 0
  }
}, 1000))
</script>

<template>
  <div class="relative">
    <input class="bg-gray-700 p-3 rounded-2xl w-full placeholder:text-gray-400 font-medium text-lg pl-8 text-gray-300" type="text" placeholder="Search" v-model="searchStore.searchValue">
    <svg class="absolute top-[25%] right-5 w-6" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="stroke-gray-400" cx="7.57177" cy="7.4819" rx="7.57177" ry="7.4819" transform="matrix(-1 0 0 1 17.178 1)" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="stroke-gray-400" d="M4.33984 14.0743L1.37128 17" stroke="#67686D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <Transition name="slide-horizontal">
    <div class="bg-red-500 text-gray-800 text-lg font-medium rounded-xl p-2 pl-8 mt-2" v-if="movieStore.isError">{{movieStore.errorMessage}}</div>
  </Transition>
</template>

<style scoped>
/* Горизонтальная slide-анимация */
.slide-horizontal-enter-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-horizontal-leave-active {
  transition: all 0.3s ease-in;
}
.slide-horizontal-enter-from {
  opacity: 0;
  transform: translateX(-10%);
}
.slide-horizontal-leave-to {
  opacity: 0;
}
</style>
