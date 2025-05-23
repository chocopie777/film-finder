<script setup>
import FilmSearch from "@/components/FilmSearch.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
const movieStore = useMovieStore()
</script>

<template>
  <div>
    <FilmSearch />
    <div class="flex flex-wrap gap-3 mt-5">
      <template v-for="item of movieStore.movies" :key="item.Title">
        <RouterLink :to="`film/${item.imdbID}`">
          <div>
            <img :src="item.Poster" alt="">
            <span class="text-gray-300 font-medium text-lg mt-1 block">
              {{ item.Title }} {{item.Year}}
            </span>
          </div>
        </RouterLink>
      </template>
    </div>
  </div>
</template>
