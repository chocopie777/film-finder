<script setup>
import {useMovieStore} from "@/stores/MovieStore.js";
import {useRoute} from "vue-router";
import {onMounted, ref, useTemplateRef} from "vue";
import Accordion from "@/components/Accordion.vue";
import isTextOver3Lines from "@/utils/isTextOver3Lines.js";

const movieStore = useMovieStore()
const route = useRoute()
const favorites = ref([])
const isReadMore = ref(false)
const text = useTemplateRef('text')
const isShowReadMoreBtn = ref(false)
const isMountedReadMoreBtn = ref(false)

movieStore.movie.value = {}

// при монтировании загрузить избранное из LocalStorage
onMounted(async () => {
  await movieStore.getMoviesByID(route.params.id)
  if(localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites')).favorites
  }
  isShowReadMoreBtn.value = isTextOver3Lines(text.value)
  if(isShowReadMoreBtn.value) {
    isMountedReadMoreBtn.value = true
  }
})

//обработчик нажатия кнопки для добавления/удаления избранного
function favoriteHandler(data) {
  if(localStorage.getItem('favorites')) {
    favorites.value = JSON.parse(localStorage.getItem('favorites')).favorites
    // Если фильм есть в избранном, то удалить. Иначе добавить в избранное
    if(favorites.value.some(obj => obj.imdbID === data.imdbID)) {
      const index = favorites.value.findIndex(obj => obj.imdbID === data.imdbID)
      if(index !== -1) {
        favorites.value.splice(index, 1)
      }
    } else {
      favorites.value.unshift(data)
    }

    localStorage.setItem('favorites', JSON.stringify({favorites: favorites.value}))
  } else {
    favorites.value.unshift(data)
    localStorage.setItem('favorites', JSON.stringify({favorites: [data]}))
  }
}
</script>

<template>
  <div v-if="!movieStore.isLoading">
    <div class="flex flex-col items-center md:items-start md:flex-row text-white mb-5">
      <div class="h-100 aspect-3/4 shrink-0 md:mr-5 rounded-xl overflow-hidden">
        <template v-if="movieStore.movie.Poster !== 'N/A'">
          <img class="object-fill h-full w-full" :src="movieStore.movie.Poster">
        </template>
        <template v-else>
          <div class="h-100 aspect-3/4 shrink-0 rounded-xl overflow-hidden bg-gray-500 flex justify-center items-center p-5">
            <span class="text-gray-300 font-medium text-2xl mt-1 block wrap-anywhere">
                {{ movieStore.movie.Title }}
            </span>
          </div>
        </template>
      </div>
      <div class="flex flex-col grow mt-5 md:mt-0">
        <div class="mb-2 relative">
          <span class="text-sm bg-yellow-400 rounded-4xl p-1 px-4 text-black font-bold">IMDB: {{movieStore.movie.imdbRating}}</span>
          <button @click.stop.prevent="favoriteHandler(movieStore.movie)" class="absolute z-10 -top-1 right-0 cursor-pointer">
            <svg class="w-8 h-12" v-if="favorites.some(obj => obj.imdbID === movieStore.movie.imdbID)" width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2112 1L13.4681 1.0127C13.9782 1.06386 14.4622 1.26485 14.8587 1.58984L15.0491 1.7627C15.4757 2.1893 15.7394 2.74867 15.7991 3.34375L15.8118 3.60156V22.7998C15.8117 22.8528 15.7907 22.9039 15.7532 22.9414C15.7157 22.9789 15.6647 22.9999 15.6116 23L15.5599 22.9932L15.512 22.9736L8.91144 19.167L8.41241 18.8789L7.91241 19.167L1.31281 22.9727C1.28233 22.9902 1.2474 23 1.21222 23L1.16046 22.9932L1.11261 22.9727C1.0974 22.9639 1.08293 22.9537 1.07062 22.9414L1.03937 22.8994C1.02183 22.8691 1.0121 22.8349 1.01202 22.7998V3.60156C1.01268 2.99809 1.22262 2.4158 1.60187 1.95312L1.77472 1.7627C2.20132 1.33609 2.76068 1.07243 3.35577 1.0127L3.61359 1H13.2112Z" fill="#FFC700" stroke="#FFC700" stroke-width="2"/>
            </svg>
            <svg class="w-8 h-12" v-else width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="stroke-1" d="M13.1992 1L13.4561 1.0127C13.9662 1.06386 14.4501 1.26485 14.8467 1.58984L15.0371 1.7627C15.4637 2.1893 15.7274 2.74867 15.7871 3.34375L15.7998 3.60156V22.7998C15.7996 22.8528 15.7787 22.9039 15.7412 22.9414C15.7037 22.9789 15.6527 22.9999 15.5996 23L15.5479 22.9932L15.5 22.9736L8.89941 19.167L8.40039 18.8789L7.90039 19.167L1.30078 22.9727C1.27031 22.9902 1.23537 23 1.2002 23L1.14844 22.9932L1.10059 22.9727C1.08538 22.9639 1.07091 22.9537 1.05859 22.9414L1.02734 22.8994C1.00981 22.8691 1.00008 22.8349 1 22.7998V3.60156C1.00066 2.99809 1.2106 2.4158 1.58984 1.95312L1.7627 1.7627C2.1893 1.33609 2.74866 1.07243 3.34375 1.0127L3.60156 1H13.1992Z" stroke="white" stroke-width="2"/>
            </svg>
          </button>
        </div>
        <span class="text-5xl font-bold">{{movieStore.movie.Title}}</span>
        <div class="mt-5 flex flex-wrap">
          <span class="bg-gray-500 p-1 px-4 rounded-4xl mr-2 mb-1">{{movieStore.movie.Rated}}</span>
          <span class="bg-gray-500 p-1 px-4 rounded-4xl mr-2 mb-1">{{movieStore.movie.Year}}</span>
          <span class="bg-gray-500 p-1 px-4 rounded-4xl mr-2 mb-1">{{movieStore.movie.Runtime}}</span>
          <span class="bg-gray-500 p-1 px-4 rounded-4xl mr-2 mb-1">{{movieStore.movie.Country}}</span>
          <span class="bg-gray-500 p-1 px-4 rounded-4xl mb-1">{{movieStore.movie.Type}}</span>
        </div>
        <div class="w-full h-[0.2px] bg-gray-700 mt-5"></div>
        <div class="flex items-center mt-5 mb-5">
          <div class="h-2 w-2 bg-yellow-400 rounded-[50%] mr-2 mt-[1px]"></div>
          <span class="text-lg text-gray-300">{{movieStore.movie.Genre}}</span>
        </div>
        <div class="w-full h-[0.2px] bg-gray-700 mb-5"></div>
        <div ref="text">
          <span :class="{'line-clamp-2': isShowReadMoreBtn}" class="text-lg text-gray-400 leading-7">{{movieStore.movie.Plot}}</span>
          <span v-if="isMountedReadMoreBtn" class="cursor-pointer text-lg text-yellow-400" @click="() => {
            isReadMore = !isReadMore
            isShowReadMoreBtn = !isShowReadMoreBtn
          }"> {{ isReadMore ? ' Hide' : ' Read more..' }}</span>
        </div>
      </div>
    </div>
    <Accordion title="Actors" :description="movieStore.movie.Actors"/>
    <Accordion title="Director" :description="movieStore.movie.Director"/>
    <Accordion title="Writer" :description="movieStore.movie.Writer"/>
    <Accordion title="Box office" :description="movieStore.movie.BoxOffice"/>
    <Accordion title="Language" :description="movieStore.movie.Language"/>
    <Accordion title="Ratings" :description="movieStore.movie.Ratings"/>
  </div>
  <div v-else class="text-white text-lg mt-5 grow">
    Loading...
  </div>
</template>

<style scoped>

</style>
