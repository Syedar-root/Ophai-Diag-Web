<template>
  <div class="layout-container" ref="layoutContainer">
    <div class="layout__header">
      <Nav></Nav>
    </div>
    <div class="layout__main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <transition name="fade">
      <Login v-show="loginShow" @containerClick="handleLoginShow" @click.stop></Login>
    </transition>
  </div>
</template>
<script setup lang="ts">
  import Nav from '../components/business/nav/index.vue'
  import Login from '../components/business/login/index.vue'
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
  import { useUserStore } from '@/store/user'
  import { useTokenStore } from '@/store/token'

  const layoutContainer = ref()
  const loginShow = ref<boolean>(false)
  const handleLoginShow = () => {
    loginShow.value = !loginShow.value
  }

  const handleContainerClick = () => {
    // 定义具名函数
    if (!userStore.user?.id) {
      handleLoginShow()
    }
  }

  const userStore = useUserStore()
  const tokenStore = useTokenStore()

  onMounted(() => {
    // console.log(import.meta.env.MODE)
    // console.log(import.meta.env.VITE_API_BASE_URL)
    if (tokenStore.token === null) {
      layoutContainer.value?.addEventListener('click', handleContainerClick)
    }
  })

  onBeforeUnmount(() => {
    layoutContainer.value?.removeEventListener('click', handleContainerClick)
    loginShow.value = false
  })

  // 监听用户状态变化
  watch(
    () => tokenStore.expire,
    () => {
      if (tokenStore.token !== null) {
        layoutContainer.value?.removeEventListener('click', handleContainerClick)
        loginShow.value = false
      } else {
        layoutContainer.value?.addEventListener('click', handleContainerClick)
      }
    }
  )
</script>

<style scoped lang="scss">
  $headerHeight: clamp(64px, 5vh, 104px);
  .layout-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .layout__header {
    position: relative;
    width: 100%;
    height: $headerHeight;
    min-height: 64px;
    border-bottom: 1px solid #ccc;
  }

  .layout__main {
    position: relative;
    width: 100%;
    height: calc(100vh - $headerHeight);
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
