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
                  <span>{{ caseId }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>姓名</label>
                  <span>张三</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>年龄</label>
                  <span>30岁</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="patient-base-info__item">
                  <label>性别</label>
                  <span>男</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="patient-history-case">
            <span class="patient-history-case__title">历史病例</span>
            <div class="patient-history-case__content">
              <div v-for="(item, index) in historyCases" class="patient-history-case__item" :key="index" v-route="`/dd/${index}`">
                <div class="point"></div>
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
        <span class="image-info-area__title">影像信息</span>
        <div class="image-info-area__content">
          <div class="images">
            <div class="images__item" @click="handleImgChange('left')" :class="{ 'images__item--is-active': currentEye === 'left' }">
              <img :src="eyesImg.left[0]" alt="left" />
            </div>
            <div class="images__item" @click="handleImgChange('right')" :class="{ 'images__item--is-active': currentEye === 'right' }">
              <img :src="eyesImg.right[0]" alt="right" />
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
        <el-image class="img" :src="imgUrl[0]" :preview-src-list="imgUrl" fit="contain" hide-on-click-modal>
          <template #error>
            <div class="image-slot">
              <el-icon size="1.5rem"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <el-image class="img detailImg" :src="imgUrl[detailImgIndex]" :preview-src-list="imgUrl" fit="contain" hide-on-click-modal>
          <template #error>
            <div class="image-slot">
              <el-icon size="1.5rem"><Picture /></el-icon>
            </div>
          </template>
        </el-image>
        <div class="image-view__opt">
          <div class="opt-item"
               :class="{ active: detailImgIndex === 1 }"
               @click = "()=>{detailImgIndex = 1}">
            <div class="opt-item__inner">
              <span>血管</span>
            </div>
          </div>
          <div class="opt-item"
               :class="{ active: detailImgIndex === 2 }"
               @click = "()=>{detailImgIndex = 2}">
            <div class="opt-item__inner">
              <span>视盘</span>
            </div>
          </div>
          <div class="opt-item"
               :class="{ active: detailImgIndex === 3 }"
               @click = "()=>{detailImgIndex = 3}">
            <div class="opt-item__inner">
              <span>病灶图</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ai-diag-area">
        <span class="title">
          <span>AI诊断</span>
          <span>各疾病患病概率</span>
        </span>
        <div class="ai-diag-area__content">
          <div class="diag">
            <div class="finding diag-item">
              <span class="title">主要发现</span>
              <div class="find-item" v-for="(item, index) in findList" :key="index">
                <div class="point" :class="[{ [`is-${item.severity}`]: item.severity }]"></div>
                <div class="info">{{ item.info }}</div>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="chart-item">
              <v-chart :option="allOptions" autoresize></v-chart>
            </div>
            <div class="chart-item">
              <v-chart :option="partOptions" autoresize></v-chart>
            </div>
          </div>
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
            <div class="report-content__line">
              <label>检查日期</label>
              <span>1111</span>
            </div>
            <div class="report-content__line">
              <label>检查医师</label>
              <span>1111</span>
            </div>
            <div class="report-content__line">
              <label>检查日期</label>
              <span>1111</span>
            </div>
          </div>
        </div>
        <div class="report-item history-diag">
          <div class="report-item__title">
            <span>历史诊断</span>
          </div>
          <div class="report-item__content">
            <div class="history-content-item">
              <div class="doctor-name">
                <span>王德民</span>
              </div>
              <div class="conclusion">
                  建议进行荧光血管造影检查，结合
                  患者年龄和症状表现，需要排除早
                  期糖尿病性视网膜病变的可能。
              </div>
            </div>
            <div class="history-content-item">
              <div class="doctor-name">
                <span>王德民</span>
              </div>
              <div class="conclusion">
                建议进行荧光血管造影检查，结合
                患者年龄和症状表现，需要排除早
                期糖尿病性视网膜病变的可能。
              </div>
            </div>
          </div>
        </div>
        <div class="report-item conclusion">
          <div class="report-item__title">
            <span>诊断结论</span>
          </div>
          <div class="report-item__content">
            <el-input :rows="5" type="textarea" v-model="conclusion" placeholder="请输入内容"></el-input>
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
  // import radarChart from '@/components/common/radarChart/index.vue'
  import leftImg from '@assets/testimg/0_man_left.jpg'
  import rightImg from '@assets/testimg/0_man_right.jpg'
  import { useViewCaseStore } from '@/store/viewingCase'
  import { useRoute } from 'vue-router'
  import VChart from 'vue-echarts'
  import 'echarts'

  const conclusion = ref('');
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
    window.addEventListener('mousemove',(e)=>{
      const detailImg = document.querySelector('.detailImg') as HTMLElement;
      const imgOpt = document.querySelector('.image-view__opt') as HTMLElement;
      if (detailImg) {
        const rect = detailImg.getBoundingClientRect();
        if(rect.x < e.clientX &&
          e.clientX < rect.x + rect.width &&
          rect.y < e.clientY &&
          e.clientY < rect.y + rect.height){
          imgOpt.style.opacity = '1';
          imgOpt.style.visibility = 'visible';
        }else {
          imgOpt.style.opacity = '0';
          imgOpt.style.visibility = 'hidden';
        }
      }
    })
  })
  watch(
    () => route.params.id,
    () => {
      loadCaseData()
    },
    { immediate: true } // 立即执行一次以处理初始路由
  )

  const chartData = ref([0.99, 0.01, 0.0000004,0.0000004,0.0000004,0.0000004,0.0000004])

  const allOptions = computed(()=> {
    return {
      xAxis: {
        type: 'category',
        data: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
      },
      grid:{
        left:'center',
        top:'center',
        width:'50%',
        height:'50%',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: chartData.value,
          type: 'bar',
          itemStyle: {
            color: function(params :any) {
              // params.value 是当前柱子的 y 值
              if (params.value > 0.5) {
                return '#FF6B6B';
              } else {
                return '#4ECDC4';
              }
            }
          }
        }
      ]
    }
  });

  const partOptions = computed(()=> {
    return {
      xAxis: {
        type: 'category',
        data: ['M', 'T', 'W', 'T', 'F', 'S']
      },
      grid:{
        left:'center',
        top:'center',
        width:'50%',
        height:'50%',
      },
      yAxis: {
        type: 'value',
        inverse: false,
      },
      series: [
        {
          data: chartData.value
            .filter((item) => item <= 0.05)
            .map((item) => { return item}),
          type: 'bar'
        }
      ]
    }
  });

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

  // const actionList = ref([{ description: '建议措施' }, { description: '建议措施' }, { description: '建议措施' }])

  const detailImgIndex = ref(1);
  const eyesImg = ref({
    left: [leftImg, leftImg, rightImg,rightImg],
    right: [rightImg, rightImg, leftImg, leftImg]
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
