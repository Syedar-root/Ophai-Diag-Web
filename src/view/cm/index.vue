<template>
  <div class="cm-container">
    <div class="cm-header">
      <el-row class="header-input-row" :gutter="4">
        <el-col :span="21">
          <el-input v-model="input" placeholder="请输入要查询的内容" :prefix-icon="Search" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="search" type="primary" :icon="CirclePlus">新增病例</el-button>
        </el-col>
      </el-row>
      <el-row class="header-select-row" :gutter="10">
        <el-col :span="4">
          <div class="select-area">
            <label>疾病分类</label>
            <el-select v-model="select" placeholder="请选择要查询的内容" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="select-area">
            <label>检查类型</label>
            <el-select v-model="select" placeholder="请选择要查询的内容" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="select-area">
            <label>诊断状态</label>
            <el-select v-model="select" placeholder="请选择要查询的内容" clearable>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="cm-main">
      <el-table :data="tableData" header-row-class-name="tb-header-row-style">
        <el-table-column prop="caseId" label="病例ID" width=""></el-table-column>
        <el-table-column prop="patientId" label="患者ID" width=""></el-table-column>
        <el-table-column prop="patientName" label="患者姓名" width=""></el-table-column>
        <el-table-column prop="age" label="年龄" width=""></el-table-column>
        <el-table-column prop="gender" label="性别" width=""></el-table-column>
        <el-table-column prop="diagnosisStatus" label="诊断状态" width=""></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width=""></el-table-column>
        <el-table-column label="操作" width="">
          <template #default="scope">
            <div class="table-opt">
              <el-icon><View></View></el-icon>
              <el-icon><Edit></Edit></el-icon>
              <el-icon><Delete></Delete></el-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cm-footer">
      <el-pagination background layout="total,prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {Plus, Search, View, Edit, Delete, CirclePlus} from "@element-plus/icons-vue";

const tableData = [
  {caseId: '123456', patientId: '123456', patientName: '张三', age: '20', gender: '男', diagnosisStatus: '未诊断', updateTime: '2021-01-01'},
  {caseId: '123456', patientId: '123456', patientName: '张三', age: '20', gender: '男', diagnosisStatus: '未诊断', updateTime: '2021-01-01'},
]
</script>

<style scoped lang="scss">
@import "styles";
</style>
