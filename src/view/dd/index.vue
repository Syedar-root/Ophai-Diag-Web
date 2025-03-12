<template>
  <div class="dd-container">
    <div class="dd-container__left">
      <div class="patient-info-area">
        <span class="title">患者信息</span>
        <div class="patient-info-area__content">
          <div class="base-info">
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="base-info-item">
                  <label>患者ID</label>
                  <span>PADCCSDF123456</span>
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
          <hr>
          <div class="history-case">
            <span class="title">历史病例</span>
            <div class="history-case__content">
              <div v-for="(item,index) in historyCases" class="history-case__item" :key="index">
                <div class="point"
                     :class="[
                    { [`is-${item.severity}`]: item.severity },
                ]"></div>
                <div class="info">
                  <span class="date">{{item.date}}</span>
                  <span class="description">{{item.description}}</span>
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
          <div class="image-item" @click="handleImgChange(0)"
               :class="{ 'active': currentImgIndex === 0 }">
            <img :src="imgUrl[0]" alt="left">
          </div>
          <div class="image-item" @click="handleImgChange(1)"
               :class="{ 'active': currentImgIndex === 1 }">
            <img :src="imgUrl[1]" alt="right">
          </div>
        </div>
      </div>
    </div>

    <div class="dd-container__center">
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
          <img class="img" :src="imgUrl[currentImgIndex]" alt="center">
        </div>
        <div class="ai-diag-area">
          <span class="title">AI诊断</span>
          <div class="ai-diag-area__content">
            <div class="diag">
              <div class="finding diag-item">
                <span class="title">主要发现</span>
                <div class="find-item" v-for="(item,index) in findList" :key="index">
                  <div class="point" :class="[{[`is-${item.severity}`]:item.severity}]"></div>
                  <div class="info">{{item.info}}</div>
                </div>
              </div>
              <div class="action diag-item">
                <span class="title">建议措施</span>
                <div class="find-item" v-for="(item,index) in actionList" :key="index">
                  <div class="info">{{item.description}}</div>
                </div>
              </div>
            </div>
            <div class="chart">
              chart
            </div>
          </div>
        </div>
      </div>

    <div class="dd-container__right">
      <div class="title">
        诊断报告
      </div>
      <div class="report-container">
        <div class="report-item">
          <div class="report-item__title">
            <span>基本信息</span>
          </div>
          <div class="report-item__content">
            <el-row :gutter="24">
              <el-col :span=12>
                <label>检查日期</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span=12>
                <label>检查医生</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span=12>
                <label>检查项目</label>
              </el-col>
              <el-col :span="12">
                <span>1111</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="report-item">
          <div class="report-item__title">
            诊断结论
          </div>
          <div class="report-item__content">
            <el-input type="textarea" placeholder="请输入内容">

            </el-input>
          </div>
        </div>
        <div class="report-opt">
          <el-button class="save" type="primary">
            保存
          </el-button>
          <el-button class="export" type="info">
            导出PDF
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {ArrowRight} from "@element-plus/icons-vue";
import leftImg from "@/assets/testimg/0_left.jpg";
import rightImg from "@/assets/testimg/0_right.jpg";

const historyCases = ref([
  {date:"2020-01-01",severity:"slight",description:"疾病描述"},
  {date: "2020-01-02", severity: "moderate", description: "疾病描述" },
  {date: "2020-01-03", severity: "severe", description: "疾病描述"}
])

const findList = ref([
  {severity:"slight",info:"疾病描述疾病描述疾病描述疾病描述疾病描述"},
  {severity:"moderate",info:"疾病描述"},
  {severity:"severe",info:"疾病描述"}
])

const actionList = ref([
  {description:"建议措施"},
  {description: "建议措施"},
  {description: "建议措施"}
])

const imgUrl = ref([leftImg,rightImg])
const currentImgIndex = ref(0);
function handleImgChange(index:number) {
  currentImgIndex.value = index;
}

</script>

<style scoped lang="scss">
@import "styles";
</style>
