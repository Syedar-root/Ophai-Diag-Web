<script setup lang="ts">
</script>

<template>
  <div class="nav-container">
    <div class="nav__logo-area">
      <img class="nav-logo" src="@/assets/logo/logo.svg" alt="logo" />
    </div>
    <div class="nav__tab-area">
      <div class="tab-item"
           :class="{active : $route.path === '/fu'}"
           v-route=" '/fu'">
        <span>快速导入</span>
      </div>
      <div class="tab-item"
           :class="{active : $route.path === '/dd'}"
           v-route=" '/dd'">
        <span>诊断分析</span>
      </div>
      <div class="tab-item"
           :class="{active : $route.path === '/cm'}"
           v-route=" '/cm'">
        <span>病例管理</span>
      </div>
    </div>
    <div class="nav__user-area">
      <div class="user-item">
        <div class="user-item__avatar">
          头像
        </div>
        <div class="user-item__info">
          <div class="user-item__info__name">
            王德明 主任医师
          </div>
          <div class="user-item__info__department">
            眼科中心
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./styles.scss";
</style>