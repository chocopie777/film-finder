<script setup>
import {ref} from "vue";

const props = defineProps(['title', 'description'])
const isOpen = ref(false)
function accordionHandler() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="mb-5">
    <div class="bg-gray-600 rounded-ss-[3px] rounded-se-[3px] p-2 pl-5 cursor-pointer flex items-center justify-between border-b-1 border-gray-400" @click="accordionHandler">
      <span class="text-lg text-gray-300 font-medium">{{props.title}}</span>
      <svg class="transition-transform duration-300" :class="{'rotate-180': isOpen}" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-gray-200" d="M10.9999 1.17C10.8126 0.983753 10.5591 0.879211 10.2949 0.879211C10.0308 0.879211 9.77731 0.983753 9.58995 1.17L5.99995 4.71L2.45995 1.17C2.27259 0.983753 2.01913 0.879211 1.75495 0.879211C1.49076 0.879211 1.23731 0.983753 1.04995 1.17C0.95622 1.26297 0.881826 1.37357 0.831057 1.49543C0.780288 1.61729 0.75415 1.74799 0.75415 1.88C0.75415 2.01202 0.780288 2.14272 0.831057 2.26458C0.881826 2.38644 0.95622 2.49704 1.04995 2.59L5.28995 6.83C5.38291 6.92373 5.49351 6.99813 5.61537 7.04889C5.73723 7.09966 5.86794 7.1258 5.99995 7.1258C6.13196 7.1258 6.26267 7.09966 6.38453 7.04889C6.50638 6.99813 6.61699 6.92373 6.70995 6.83L10.9999 2.59C11.0937 2.49704 11.1681 2.38644 11.2188 2.26458C11.2696 2.14272 11.2957 2.01202 11.2957 1.88C11.2957 1.74799 11.2696 1.61729 11.2188 1.49543C11.1681 1.37357 11.0937 1.26297 10.9999 1.17Z" fill="#181818"/>
      </svg>
    </div>
    <transition name="slide">
      <div v-if="isOpen" class="text-gray-300">
        <div v-if="!Array.isArray(description)" class="bg-gray-600 rounded-es-[3px] rounded-ee-[3px] p-2 pl-5 flex items-center justify-between">
          <span>{{props.description}}</span>
        </div>
        <div v-else class="bg-gray-600 rounded-es-[3px] rounded-ee-[3px] p-2 pl-5 cursor-pointer flex flex-col">
          <template v-if="description.length">
            <template v-for="item in description" :key="item.Source">
              <span>{{item.Source}} - {{item.Value}}</span>
            </template>
          </template>
          <span v-else>N/A</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Анимация */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px; /* Максимальная высота для плавности */
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding: 0 16px;
  overflow: hidden;
}
</style>
