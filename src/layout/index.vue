<template>
    <div class="layout-container">
        <div class="layout__header">
          <Nav></Nav>
        </div>
        <div class="layout__main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import Nav from "../components/business/nav/index.vue";
</script>

<style scoped>
.layout-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.layout__header {
    width: 100%;
    height: clamp(32px, 5vh, 64px);
}

.layout__main {
    width: 100%;
    flex-grow: 1;
}
</style>


