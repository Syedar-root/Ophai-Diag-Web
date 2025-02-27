<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  let app = document.getElementById('app');
  if (!app) return;
  app.style.width = '100vw';
  app.style.height = '100vh';
  app.style.padding = '0';
  app.style.margin = '0';
  app.style.overflow = 'hidden';
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
