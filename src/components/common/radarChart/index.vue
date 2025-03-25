<script setup lang="ts">
  import type { radarChartProps } from '@/components/common/radarChart/types'
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'

  const chartDom = ref<HTMLElement | null>(null)
  let chartInstance: echarts.ECharts | null = null
  const props = defineProps<radarChartProps>()

  // 初始化图表
  onMounted(() => {
    if (chartDom.value) {
      chartInstance = echarts.init(chartDom.value)
      updateChart()
      // 窗口变化时重新渲染
      window.addEventListener('resize', () => {
        chartInstance?.resize()
      })
    }
  })

  // 更新图表
  const updateChart = () => {
    const option = {
      title: {
        text: props.title
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          align: 'left'
        },
        valueFormatter: (value: number) => {
          return value + '%'
        }
      },
      radar: {
        indicator: props.indicator,
        radius: '40%'
      },
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          data: props.data,
          areaStyle: props.isFillStyle
            ? {
                opacity: 0.2
              }
            : null,
          color: props.color || '#FF9900'
        }
      ]
    }
    chartInstance?.setOption(option)
  }

  // 监听props变化
  watch(
    () => [props.indicator, props.data],
    () => updateChart(),
    { deep: true }
  )

  // 销毁图表
  onUnmounted(() => {
    chartInstance?.dispose()
  })
</script>

<template>
  <div ref="chartDom" class="radar"></div>
</template>

<style scoped lang="scss">
  .radar {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
