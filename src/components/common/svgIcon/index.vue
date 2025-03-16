<script setup lang="ts">
import type{svgIconProps} from "@/components/common/svgIcon/types.ts";
import {defineProps} from "vue";
// 修改 props 定义以支持组件传递
const props = defineProps<svgIconProps & {
  icon?: Component | string
}>()

</script>

<template>
  <component
    :is="props.icon"
    :style="{
      width: size ? size + 'px' : '1rem',
      height: size ? size + 'px' : '1rem',
      fill: color || 'currentColor',
    }"
    :class="className"
  />
</template>

<style scoped lang="scss">

</style>