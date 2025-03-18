<template>
  <div class="dd-container">
    <div v-if="!isEmpty" class="dd-container__left">
      <div class="patient-info-area">
        <span class="title">患者信息</span>
        <div class="patient-info-area__content">
          <div class="base-info">
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="base-info-item">
                  <label>患者ID</label>
                  <span>{{ caseId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="base-info-item">
                  <label>姓名</label>
                  <span>张三</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="base-info-item">
                  <label>年龄</label>
                  <span>30岁</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="base-info-item">
                  <label>性别</label>
                  <span>男</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <hr />
          <div class="history-case">
            <span class="title">历史病例</span>
            <div class="history-case__content">
              <div v-for="(item, index) in historyCases" class="history-case__item" :key="index" v-route="`/dd/${index}`">
                <div class="point" :class="[{ [`is-${item.severity}`]: item.severity }]"></div>
                <div class="info">
                  <span class="date">{{ item.date }}</span>
                  <span class="description">{{ item.description }}</span>
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
        <span class="title">影像信息</span>
        <div class="image-content">
          <div class="image-item" @click="handleImgChange('left')" :class="{ active: currentEye === 'left' }">
            <img :src="eyesImg.left[0]" alt="left" />
          </div>
          <div class="image-item" @click="handleImgChange('right')" :class="{ active: currentEye === 'right' }">
            <img :src="eyesImg.right[0]" alt="right" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isEmpty" class="dd-container__center">
      <div class="image-view">
        <div class="image-view__opt">
          <div class="opt-item">
            <el-button type="primary">放大</el-button>
          </div>
          <div class="opt-item">
            <el-button type="primary">缩小</el-button>
          </div>
          <div class="opt-item">
            <el-button type="primary">旋转</el-button>
          </div>
          <div class="opt-item">
            <el-button type="primary">翻转</el-button>
          </div>
        </div>
        <el-image class="img" :src="imgUrl[0]" :preview-src-list="imgUrl" fit="contain" hide-on-click-modal>
          <template #error>
            <div class="image-slot">
              <el-icon size="1.5rem"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
      </div>
      <div class="ai-diag-area">
        <span class="title">AI诊断</span>
        <div class="ai-diag-area__content">
          <div class="diag">
            <div class="finding diag-item">
              <span class="title">主要发现</span>
              <div class="find-item" v-for="(item, index) in findList" :key="index">
                <div class="point" :class="[{ [`is-${item.severity}`]: item.severity }]"></div>
                <div class="info">{{ item.info }}</div>
              </div>
            </div>
            <div class="action diag-item">
              <span class="title">建议措施</span>
              <div class="find-item" v-for="(item, index) in actionList" :key="index">
                <div class="info">{{ item.description }}</div>
              </div>
            </div>
          </div>
          <div class="chart">chart</div>
        </div>
      </div>
    </div>

    <div v-if="!isEmpty" class="dd-container__right">
      <div class="title">诊断报告</div>
      <div class="report-container">
        <div class="report-item">
          <div class="report-item__title">
            <span>基本信息</span>
          </div>
          <div class="report-item__content">
            <el-row :gutter="24">
              <el-col :span="12">
                <label>检查日期</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <label>检查医生</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <label>检查项目</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="report-item">
          <div class="report-item__title">诊断结论</div>
          <div class="report-item__content">
            <el-input type="textarea" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="report-opt">
          <el-button class="save" type="primary">保存</el-button>
          <el-button class="export" type="info">导出PDF</el-button>
        </div>
      </div>
    </div>

    <el-empty v-if="isEmpty" class="empty-container" :description="emptyText" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ArrowRight, Picture } from '@element-plus/icons-vue'
  import leftImg from '@/assets/testimg/0_left.jpg'
  import rightImg from '@/assets/testimg/0_right.jpg'
  import { useViewCaseStore } from '@/store/viewingCase'
  import { useRoute } from 'vue-router'

  const isEmpty = ref(true)
  const emptyText = ref('请前往病例管理页面选择病例查看')
  const viewCaseStore = useViewCaseStore()
  const route = useRoute()
  const caseId = ref<string | string[] | null>('')
  const loadCaseData = () =>{
    if (route.params.id === '' || route.params.id === null || route.params.id === undefined) {
      if (viewCaseStore.viewCase.id !== '') {
        caseId.value = viewCaseStore.viewCase.id
        isEmpty.value = false
      } else {
        isEmpty.value = true
      }
    } else {
      caseId.value = route.params.id
      isEmpty.value = false
      viewCaseStore.setViewCase({ id: route.params.id })
    }
  }
  onMounted(() => {
    loadCaseData();
  })
  watch(
    () => route.params.id,
    () => {
      loadCaseData()
    },
    { immediate: true } // 立即执行一次以处理初始路由
  )

  const historyCases = ref([
    { date: '2020-01-01', severity: 'slight', description: '疾病描述' },
    { date: '2020-01-02', severity: 'moderate', description: '疾病描述' },
    { date: '2020-01-03', severity: 'severe', description: '疾病描述' }
  ])

  const findList = ref([
    { severity: 'slight', info: '疾病描述疾病描述疾病描述疾病描述疾病描述' },
    { severity: 'moderate', info: '疾病描述' },
    { severity: 'severe', info: '疾病描述' }
  ])

  const actionList = ref([{ description: '建议措施' }, { description: '建议措施' }, { description: '建议措施' }])

  const eyesImg = ref({
    left: [leftImg, leftImg, rightImg],
    right: [rightImg, rightImg, leftImg]
  })
  const imgUrl = computed(() => {
    return currentEye.value === 'left' ? eyesImg.value.left : eyesImg.value.right
  })
  const currentEye = ref('left')
  function handleImgChange(index: string) {
    currentEye.value = index
  }
</script>

<style scoped lang="scss">
  @import 'styles';
</style>
