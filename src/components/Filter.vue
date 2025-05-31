<script setup>
import {ref, watch} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";
import {useSearchStore} from "@/stores/SearchStore.js";
import {usePaginationStore} from "@/stores/PaginationStore.js";
import {useFilterStore} from "@/stores/FilterStore.js";
const movieStore = useMovieStore()
const searchStore = useSearchStore()
const paginationStore = usePaginationStore()
const filterStore = useFilterStore()

const isShow = ref(false)

watch(() => filterStore.filterValue, (newFilterValue) => {
  paginationStore.currentPageNumber = 1
  movieStore.getMoviesBySearchByPageByType(searchStore.searchValue,paginationStore.currentPageNumber, newFilterValue)
})

function filterHandler(type) {
  movieStore.isError = false
  filterStore.filterValue = type
  isShow.value = false
}
</script>

<template>
  <div v-if="movieStore.movies.length" class="relative z-1">
   <button class="bg-gray-500 p-2 px-4 rounded flex items-center cursor-pointer" @click="isShow = !isShow">
     <span class="text-gray-200 mr-2 font-medium">{{filterStore.filterValue }}</span>
     <svg width="16" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path class="fill-gray-200" fill-rule="evenodd" clip-rule="evenodd" d="M6.87774 3.37856C6.87774 5.24523 5.33886 6.75821 3.43887 6.75821C1.53999 6.75821 0 5.24523 0 3.37856C0 1.51298 1.53999 0 3.43887 0C5.33886 0 6.87774 1.51298 6.87774 3.37856ZM18.4933 1.89833C19.3244 1.89833 20 2.56203 20 3.37856C20 4.19618 19.3244 4.85989 18.4933 4.85989H11.9178C11.0856 4.85989 10.4101 4.19618 10.4101 3.37856C10.4101 2.56203 11.0856 1.89833 11.9178 1.89833H18.4933ZM1.50777 12.958H8.08329C8.91551 12.958 9.59106 13.6217 9.59106 14.4393C9.59106 15.2558 8.91551 15.9206 8.08329 15.9206H1.50777C0.675552 15.9206 0 15.2558 0 14.4393C0 13.6217 0.675552 12.958 1.50777 12.958ZM16.5611 17.7778C18.4611 17.7778 20 16.2648 20 14.3992C20 12.5325 18.4611 11.0196 16.5611 11.0196C14.6623 11.0196 13.1223 12.5325 13.1223 14.3992C13.1223 16.2648 14.6623 17.7778 16.5611 17.7778Z" fill="white"/>
     </svg>
   </button>
    <div v-if="isShow" class="absolute right-0 bg-gray-500 text-gray-200 flex flex-col left-0 top-11 rounded z-1">
      <label class="p-2 px-4 cursor-pointer border-b border-gray-400" @click="filterHandler('all')">
        <span>all</span>
        <input class="hidden" type="radio" name="filter">
      </label>
      <label class="p-2 px-4 cursor-pointer" @click="filterHandler('movie')">
        <span>movie</span>
        <input class="hidden" type="radio" name="filter">
      </label>
      <label class="p-2 px-4 cursor-pointer" @click="filterHandler('series')">
        <span>series</span>
        <input class="hidden" type="radio" name="filter">
      </label>
      <label class="p-2 px-4 cursor-pointer" @click="filterHandler('game')">
        <span>game</span>
        <input class="hidden" type="radio" name="filter">
      </label>
    </div>
  </div>
</template>

<style scoped>

</style>
