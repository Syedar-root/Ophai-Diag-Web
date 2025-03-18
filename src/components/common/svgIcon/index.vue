<!--<script setup lang="ts">-->
<!--import type{svgIconProps} from "@/components/common/svgIcon/types.ts";-->
<!--import {defineProps} from "vue";-->
<!--// 修改 props 定义以支持组件传递-->
<!--const props = defineProps<svgIconProps>()-->

<!--</script>-->

<!--<template>-->
<!--  <component-->
<!--    :is="props.icon"-->
<!--    :style="{-->
<!--      width: size ? size + 'px' : '1rem',-->
<!--      height: size ? size + 'px' : '1rem',-->
<!--      fill: color || 'currentColor',-->
<!--    }"-->
<!--    :class="className"-->
<!--  />-->
<!--</template>-->

<style scoped lang="scss"></style>

<script setup lang="ts">
  import type { svgIconProps } from '@/components/common/svgIcon/types.ts'
  import { defineProps, computed } from 'vue'

  const props = defineProps<svgIconProps>()

  // 新增计算属性动态加载svg图标
  const iconComponent = computed(() => {
    if (props.icon) return props.icon
    if (props.name) {
      try {
        return defineComponent(() => import(`@/assets/icons/${props.name}.svg`))
      } catch {
        console.warn(`SVG icon "${props.name}" not found`)
        return null
      }
    }
    return null
  })
</script>

<template>
  <component
    :is="iconComponent"
    :style="{
      width: size ? size + 'px' : '1rem',
      height: size ? size + 'px' : '1rem',
      fill: color || 'currentColor'
    }"
    :class="className" />
</template>
