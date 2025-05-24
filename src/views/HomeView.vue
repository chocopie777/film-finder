<script setup>
import FilmSearch from "@/components/FilmSearch.vue";
import {useMovieStore} from "@/stores/MovieStore.js";
const movieStore = useMovieStore()
</script>

<template>
  <div>
    <FilmSearch />
    <div class="overflow-hidden">
      <div class="flex flex-wrap mt-5 ml-[-10px] mr-[-10px]">
        <template v-for="item of movieStore.movies" :key="item.Title">
          <RouterLink v-if="item.Poster !== 'N/A'" class="w-[calc(20%-2*10px)] m-[10px] h-80 relative rounded-4xl overflow-hidden" :to="`film/${item.imdbID}`">
            <img class="w-full h-full absolute object-cover" :src="item.Poster" alt="">
          </RouterLink>
          <RouterLink v-else class="w-1/5 bg-gray-500 rounded-4xl flex justify-center items-center p-5" :to="`film/${item.imdbID}`">
              <span class="text-gray-300 font-medium text-lg mt-1 block wrap-anywhere">
                {{ item.Title }} {{item.Year}}
              </span>
          </RouterLink>
        </template>
      </div>
    </div>
  </div>
</template>
