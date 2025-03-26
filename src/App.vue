<script setup lang="ts">
  import { onMounted } from 'vue'

  onMounted(() => {
    performance.mark('vue-app-mounted');
    let app = document.getElementById('app')
    if (!app) return
    app.style.maxWidth = '100vw'
    app.style.width = '100vw'
    app.style.height = '100vh'
    app.style.padding = '0'
    app.style.marginLeft = '0'
    app.style.marginRight = '0'
    app.style.overflow = 'hidden'
    app.style.position = 'absolute'
  })
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
