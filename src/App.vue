<script setup>
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <main class="grow-1">
    <div class="mx-auto max-w-[1200px]">
      <RouterView />
    </div>
  </main>
  <Footer />
</template>

<style scoped>
</style>
