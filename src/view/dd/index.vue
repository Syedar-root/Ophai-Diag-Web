<template>
  <div class="dd-container">
    <div v-if="!isEmpty" class="dd-container__left">
      <div class="patient-info-area">
        <span class="patient-info-area__title">患者信息</span>
        <div class="patient-info-area__content">
          <div class="patient-base-info">
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>患者ID</label>
                  <span>{{ patientInfo.id }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>姓名</label>
                  <span>{{ patientInfo.name || '姓名不详' }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>年龄</label>
                  <span>{{ patientInfo.age || '年龄不详' }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>性别</label>
                  <span>{{ patientInfo.gender || '性别不详' }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="patient-history-case">
            <span class="patient-history-case__title">历史病例</span>
            <div class="patient-history-case__content">
              <div
                v-for="item in patientInfo.historyCases"
                class="patient-history-case__item"
                :key="item.caseId"
                v-route="`/dd/${item.caseId}`">
                <div class="point"></div>
                <div class="info">
                  <span class="date">{{ formatDate(item.createDate) }}</span>
                  <span class="description">{{ item.diagStatus }}</span>
                </div>
                <el-icon>
                  <ArrowRight></ArrowRight>
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="image-info-area">
        <span class="image-info-area__title">影像信息</span>
        <div class="image-info-area__content">
          <div class="images">
            <div
              class="images__item"
              @click="handleImgChange('left')"
              :class="{ 'images__item--is-active': currentEye === 'left' }">
              <el-image class="img" :src="imageInfo.images.get(`left_origin_url`)" fit="contain" hide-on-click-modal>
                <template #error>
                  <div class="img__error">
                    <el-icon size="1.5rem"><Picture /></el-icon>
                    <span>诶呀粗错了</span>
                  </div>
                </template>
              </el-image>
            </div>
            <div
              class="images__item"
              @click="handleImgChange('right')"
              :class="{ 'images__item--is-active': currentEye === 'right' }">
              <el-image class="img" :src="imageInfo.images.get(`right_origin_url`)" fit="contain" hide-on-click-modal>
                <template #error>
                  <div class="img__error">
                    <el-icon size="1.5rem"><Picture /></el-icon>
                    <span>诶呀粗错了</span>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
          <div class="image-info">
            <div class="image-info__item">
              <label>设备名称：</label>
              <span>RDS312D397ON34</span>
            </div>
            <div class="image-info__item">
              <label>分辨率：</label>
              <span>512 X 512</span>
            </div>
            <div class="image-info__item">
              <label>拍摄时间：</label>
              <span>2022.91.90</span>
            </div>
            <div class="image-info__item">
              <label>医学影像技师：</label>
              <span>王大明</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isEmpty" class="dd-container__center">
      <div class="image-view">
        <el-image
          class="image-view__content"
          :src="imageInfo.images.get(`${currentEye}_origin_url`)"
          :preview-src-list="previewImgUrl"
          fit="contain"
          hide-on-click-modal>
          <template #error>
            <div class="image-view__error">
              <el-icon size="1.5rem"><Picture /></el-icon>
              <span>诶呀粗错了</span>
            </div>
          </template>
        </el-image>
        <el-image
          class="image-view__content detailImg"
          :src="imageInfo.images.get(`${currentEye}_${currentType}_url`)"
          :preview-src-list="previewImgUrl"
          fit="contain"
          hide-on-click-modal>
          <template #error>
            <div class="image-view__error">
              <el-icon size="1.5rem"><Picture /></el-icon>
              <span>诶呀粗错了</span>
            </div>
          </template>
        </el-image>
        <div class="image-view__opt">
          <div
            class="opt-item"
            :class="{ active: currentType === 'vessel' }"
            @click="
              () => {
                currentType = 'vessel'
              }
            ">
            <div class="opt-item__inner">
              <span>血管</span>
            </div>
          </div>
          <div
            class="opt-item"
            :class="{ active: currentType === 'disk' }"
            @click="
              () => {
                currentType = 'disk'
              }
            ">
            <div class="opt-item__inner">
              <span>视盘</span>
            </div>
          </div>
          <div
            class="opt-item"
            :class="{ active: currentType === 'heatmap' }"
            @click="
              () => {
                currentType = 'heatmap'
              }
            ">
            <div class="opt-item__inner">
              <span>病灶图</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ai-diag-area">
        <span class="ai-diag-area__title">
          <span>AI诊断</span>
          <span>各疾病患病概率</span>
        </span>
        <div class="ai-diag-area__content">
          <div class="diag">
            <div class="finding diag-content">
              <span class="diag-content__title">主要发现</span>
              <div class="diag-content__find-item" v-for="(item, index) in aiDiagInfo.suggestions" :key="index">
                <div class="point"></div>
                <div class="info">{{ item }}</div>
              </div>
            </div>
            <div class="finding diag-content">
              <span class="diag-content__title">建议用药</span>
              <div class="diag-content__find-item" v-for="(item, index) in aiDiagInfo.drugs" :key="index">
                <div class="func-info info">{{ item.function + '：' }}</div>
                <div class="info">{{ item.drug.toString().split(',').join('，') }}</div>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="chart-content">
              <v-chart :option="allOptions" autoresize></v-chart>
            </div>
            <div class="chart-content">
              <v-chart :option="partOptions" autoresize></v-chart>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isEmpty" class="dd-container__right">
      <div class="report-container">
        <div class="report-container__title">诊断报告</div>
        <div class="report-item">
          <div class="report-item__title">
            <span>基本信息</span>
          </div>
          <div class="report-item__content">
            <div class="report-item__line">
              <label>检查日期</label>
              <span>{{ formatDate(reportInfo.createDate) }}</span>
            </div>
            <div class="report-item__line">
              <label>检查医师</label>
              <span>{{ reportInfo.responsibleDoctor || '不详' }}</span>
            </div>
          </div>
        </div>
        <div class="report-item history-diag">
          <div class="report-item__title">
            <span>历史诊断</span>
          </div>
          <div class="report-item__content history-diag__content">
            <div class="history-diag__item">
              <div class="doctor-name">
                <span>王德民</span>
              </div>
              <div class="ex-conclusion">
                建议进行荧光血管造影检查，结合 患者年龄和症状表现，需要排除早 期糖尿病性视网膜病变的可能。
              </div>
            </div>
            <div class="history-diag__item">
              <div class="doctor-name">
                <span>王德民</span>
              </div>
              <div class="ex-conclusion">
                建议进行荧光血管造影检查，结合 患者年龄和症状表现，需要排除早 期糖尿病性视网膜病变的可能。
              </div>
            </div>
          </div>
        </div>
        <div class="report-item conclusion">
          <div class="report-item__title">
            <span>诊断结论</span>
          </div>
          <div class="report-item__content">
            <el-input :rows="5" type="textarea" v-model="saveQuery.currentDiag" placeholder="请输入内容"></el-input>
            <el-select
              v-model="saveQuery.currentDisease"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="Choose tags for your article">
              <el-option v-for="item in diseaseMap" :key="item[0]" :label="item[1]" :value="item[0]" />
            </el-select>
          </div>
        </div>
        <div class="report-opt">
          <el-button class="report-opt__save" type="primary" @click="console.log(saveQuery.currentDisease)">
            保存
          </el-button>
          <el-button class="report-opt__export" type="info">导出PDF</el-button>
        </div>
      </div>
    </div>

    <el-empty v-if="isEmpty" class="empty-container" :description="emptyText" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import { ArrowRight, Picture } from '@element-plus/icons-vue'
  import { useViewCaseStore } from '@/store/viewingCase'
  import { useRoute } from 'vue-router'
  import VChart from 'vue-echarts'
  import 'echarts'
  import { getCaseService } from '@/api/dd'
  import {
    type AIDiagViewObj,
    getViewObj,
    type ImageInfoViewObj,
    type PatientInfoViewObj,
    type ReportViewObj,
    type Drug,
    type HistoryCase,
    type HistoryDiag
  } from '@/view/dd/types.ts'

  const isEmpty = ref(true)
  const emptyText = ref('请前往病例管理页面选择病例查看')
  const viewCaseStore = useViewCaseStore()
  const route = useRoute()

  const loadCaseData = () => {
    if (route.params.id === '' || route.params.id === null || route.params.id === undefined) {
      isEmpty.value = viewCaseStore.viewCase.id === ''
    } else {
      isEmpty.value = false
      viewCaseStore.setViewCase({ id: route.params.id })
    }
  }
  onMounted(() => {
    loadCaseData()
    window.addEventListener('mousemove', e => {
      const detailImg = document.querySelector('.detailImg') as HTMLElement
      const imgOpt = document.querySelector('.image-view__opt') as HTMLElement
      if (detailImg) {
        const rect = detailImg.getBoundingClientRect()
        if (
          rect.x < e.clientX &&
          e.clientX < rect.x + rect.width &&
          rect.y < e.clientY &&
          e.clientY < rect.y + rect.height
        ) {
          imgOpt.style.opacity = '1'
          imgOpt.style.visibility = 'visible'
        } else {
          imgOpt.style.opacity = '0'
          imgOpt.style.visibility = 'hidden'
        }
      }
    })
  })
  watch(
    () => route.params.id,
    () => {
      loadCaseData()
      getCaseService(viewCaseStore.viewCase.id).then(res => {
        console.log(res)
        const result = getViewObj(res)
        // 解构赋值
        patientInfo.value = result.patientInfo
        imageInfo.value = result.imageInfo
        aiDiagInfo.value = result.aiDiagInfo
        reportInfo.value = result.reportInfo
      })
    },
    { immediate: true } // 立即执行一次以处理初始路由
  )

  const patientInfo = ref<PatientInfoViewObj>({
    id: '',
    name: '',
    age: 0,
    gender: '',
    historyCases: [] as HistoryCase[]
  })
  const imageInfo = ref<ImageInfoViewObj>({
    images: new Map<string, string>()
  })
  const aiDiagInfo = ref<AIDiagViewObj>({
    predictions: new Map(),
    suggestions: [],
    drugs: [] as Drug[]
  })
  const reportInfo = ref<ReportViewObj>({
    createDate: '',
    responsibleDoctor: '',
    historyDiags: [] as HistoryDiag[],
    diseaseTypes: [] as string[]
  })

  const formatDate = (dateArray: string) => {
    if (!dateArray || dateArray.length < 3) return '无效日期'
    const [year, month, day] = dateArray
    // 使用 padStart 补零
    const paddedMonth = month.toString().padStart(2, '0')
    const paddedDay = day.toString().padStart(2, '0')
    return `${year}-${paddedMonth}-${paddedDay}`
  }

  const diseaseMap = new Map([
    ['D', '糖尿病'],
    ['G', '青光眼'],
    ['C', '白内障'],
    ['A', '老年性黄斑变性'],
    ['H', '高血压'],
    ['M', '近视'],
    ['O', '其他疾病']
  ])

  const baseOptions = (data: any) => {
    return {
      xAxis: {
        type: 'category',
        data: Array.from(data.value.keys())
      },
      grid: {
        left: 'center',
        top: 'center',
        width: '50%',
        height: '50%'
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `${(value * 100).toFixed(1)}%` // 小数转百分比
        }
      },
      tooltip: {
        trigger: 'axis', // 改回item触发模式
        formatter: function () {
          // 获取全部数据并排序
          const allData = Array.from<[string, number]>(data.value.entries()).sort((a, b) => b[1] - a[1])
          // let result = `<div style="margin-bottom: 5px; font-weight: bold; color: #666">完整疾病概率报告</div>`;
          let result = ''
          allData.forEach(([key, value]) => {
            const diseaseName = diseaseMap.get(key) ?? '未知疾病'
            result += `
          <div style="padding: 4px 0; line-height: 1.6;">${diseaseName + key}:
            <span style="float: right; margin-left: 25px; color: #333; font-weight: 500;">
              ${(value * 100).toFixed(4)}%
            </span>
          </div>`
          })
          return result
        },
        extraCssText: 'width: 280px;' // 固定宽度防止抖动
      },
      series: [
        {
          data: Array.from(data.value.values()),
          type: 'bar',
          itemStyle: {
            color: function (params: any) {
              // params.value 是当前柱子的 y 值
              if (params.value > 0.5) {
                return '#FF6B6B'
              } else {
                return '#4ECDC4'
              }
            }
          }
        }
      ]
    }
  }

  // 图表数据
  const allOptions = computed(() => {
    const data = ref(aiDiagInfo.value.predictions)
    return baseOptions(data)
  })

  const partOptions = computed(() => {
    const data = ref(new Map(Array.from(aiDiagInfo.value.predictions.entries()).filter(([_, value]) => value <= 0.05)))
    return baseOptions(data)
  })

  const currentType = ref('vessel')
  const previewImgUrl = computed(() => {
    const images = imageInfo.value.images
    if (currentEye.value === 'left') {
      return [
        images.get('left_origin_url')!,
        images.get('left_vessel_url')!,
        images.get('left_disk_url')!,
        images.get('left_heatmap_url')!
      ]
    } else {
      return [
        images.get('right_origin_url')!,
        images.get('right_vessel_url')!,
        images.get('right_disk_url')!,
        images.get('right_heatmap_url')!
      ]
    }
  })
  const currentEye = ref('left')
  function handleImgChange(index: string) {
    currentEye.value = index
  }

  const saveQuery = ref({
    currentDiag: '',
    currentDisease: [] as string[]
  })
  /**
   * ## Temporarily useless
   * ============================================================================================
   * 废案区
   * ============================================================================================
   *
    // const originalObject = {
    //   D: 0.1515355408191681,
    //   G: 0.0005213189288042486,
    //   C: 0.00002619951010274235,
    //   A: 0.0004415274306666106,
    //   H: 0.00007794963312335312,
    //   M: 0.000016361142115783878,
    //   O: 0.6710959672927856
   // };

   // const actionList = ref([{ description: '建议措施' }, { description: '建议措施' }, { description: '建议措施' }])

   // const historyCases = ref([
   //   { date: '2020-01-01', severity: 'slight', description: '疾病描述' },
   //   { date: '2020-01-02', severity: 'moderate', description: '疾病描述' },
   //   { date: '2020-01-03', severity: 'severe', description: '疾病描述' }
   // ])
   */
</script>

<style scoped lang="scss">
  @import 'styles';
</style>
