<template>
    <div class="layout-container" ref="layoutContainer">
        <div class="layout__header">
          <Nav></Nav>
        </div>
        <div class="layout__main">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
    </div>
  <transition name="fade">
    <Login v-show="loginShow" @containerClick="handleLoginShow" @click.stop></Login>
  </transition>
</template>
<script setup lang="ts">
import Nav from "../components/business/nav/index.vue";
import Login from "../components/business/login/index.vue";
import { ref } from 'vue'

const layoutContainer = ref();
const loginShow = ref<boolean>(false);
const handleLoginShow = () => {
  loginShow.value = !loginShow.value;
}

onMounted(()=>{
  layoutContainer.value?.addEventListener('click', ()=>{
    handleLoginShow();
  });
})
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
    height: clamp(43px, 5vh, 64px);
    min-height: 43px;
    border-bottom: 1px solid #ccc;
}

.layout__main {
    width: 100%;
    flex-grow: 1;
    max-height: 99%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


