<script setup>
import {onMounted, ref} from "vue";
import {useMovieStore} from "@/stores/MovieStore.js";

const movieStore = useMovieStore()
const favorites = ref([])

// при монтировании загрузить избранное из LocalStorage
onMounted(() => {
  if(localStorage.getItem('favorites') && favorites.value.length === 0) {
    favorites.value = JSON.parse(localStorage.getItem('favorites')).favorites
  }
})

// Обработчик нажатия на кнопку избранное, для удаления из избранного
function favoriteHandler(imdbID) {
  try {
    favorites.value = JSON.parse(localStorage.getItem('favorites')).favorites

    const index = favorites.value.findIndex(obj => obj.imdbID === imdbID)
    if(index !== -1) {
      favorites.value.splice(index, 1)
    }

    localStorage.setItem('favorites', JSON.stringify({favorites: favorites.value}))
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="text-white text-xl font-medium">
    Количество избранных фильмов: ({{favorites.length}})
  </div>
  <div v-if="!movieStore.isLoading" class="overflow-hidden">
    <div  class="flex flex-wrap mt-5 ml-[-10px] mr-[-10px]">
      <template v-for="item of favorites" :key="item.imdbID">
        <RouterLink v-if="item.Poster !== 'N/A'" class="relative w-[calc(20%-2*10px)] m-[10px] h-80 relative rounded-4xl overflow-hidden group" :to="`film/${item.imdbID}`">
          <button @click.stop.prevent="favoriteHandler(item.imdbID)" class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-10 top-5 right-5 cursor-pointer">
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2112 1L13.4681 1.0127C13.9782 1.06386 14.4622 1.26485 14.8587 1.58984L15.0491 1.7627C15.4757 2.1893 15.7394 2.74867 15.7991 3.34375L15.8118 3.60156V22.7998C15.8117 22.8528 15.7907 22.9039 15.7532 22.9414C15.7157 22.9789 15.6647 22.9999 15.6116 23L15.5599 22.9932L15.512 22.9736L8.91144 19.167L8.41241 18.8789L7.91241 19.167L1.31281 22.9727C1.28233 22.9902 1.2474 23 1.21222 23L1.16046 22.9932L1.11261 22.9727C1.0974 22.9639 1.08293 22.9537 1.07062 22.9414L1.03937 22.8994C1.02183 22.8691 1.0121 22.8349 1.01202 22.7998V3.60156C1.01268 2.99809 1.22262 2.4158 1.60187 1.95312L1.77472 1.7627C2.20132 1.33609 2.76068 1.07243 3.35577 1.0127L3.61359 1H13.2112Z" fill="#FFC700" stroke="#FFC700" stroke-width="2"/>
            </svg>
          </button>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-1 w-full top-0 left-0 h-[50%] bg-gradient-to-b from-black/90 to-black/0"></div>
          <img class="w-full h-full absolute object-fill" :src="item.Poster" alt="poster">
        </RouterLink>
        <RouterLink v-else class="relative w-[calc(20%-2*10px)] m-[10px] h-80 bg-gray-500 rounded-4xl flex justify-center items-center p-5 overflow-hidden group" :to="`film/${item.imdbID}`">
          <button @click.stop.prevent="favoriteHandler(item.imdbID)" class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-10 top-5 right-5 cursor-pointer">
            <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.2112 1L13.4681 1.0127C13.9782 1.06386 14.4622 1.26485 14.8587 1.58984L15.0491 1.7627C15.4757 2.1893 15.7394 2.74867 15.7991 3.34375L15.8118 3.60156V22.7998C15.8117 22.8528 15.7907 22.9039 15.7532 22.9414C15.7157 22.9789 15.6647 22.9999 15.6116 23L15.5599 22.9932L15.512 22.9736L8.91144 19.167L8.41241 18.8789L7.91241 19.167L1.31281 22.9727C1.28233 22.9902 1.2474 23 1.21222 23L1.16046 22.9932L1.11261 22.9727C1.0974 22.9639 1.08293 22.9537 1.07062 22.9414L1.03937 22.8994C1.02183 22.8691 1.0121 22.8349 1.01202 22.7998V3.60156C1.01268 2.99809 1.22262 2.4158 1.60187 1.95312L1.77472 1.7627C2.20132 1.33609 2.76068 1.07243 3.35577 1.0127L3.61359 1H13.2112Z" fill="#FFC700" stroke="#FFC700" stroke-width="2"/>
            </svg>
          </button>
          <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute z-1 w-full top-0 left-0 h-[50%] bg-gradient-to-b from-black/90 to-black/0"></div>
          <span class="text-gray-300 font-medium text-lg mt-1 block wrap-anywhere">
              {{ item.Title }} {{item.Year}}
            </span>
        </RouterLink>
      </template>
    </div>
  </div>
  <div v-else class="text-white text-lg mt-5">
    Loading...
  </div>
</template>

<style scoped>

</style>
