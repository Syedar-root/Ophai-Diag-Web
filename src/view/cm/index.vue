<template>
  <div class="cm-container">
    <div class="cm-header">
      <el-row class="header-input-row" :gutter="4">
        <el-col :span="21">
          <el-input v-model="query.caseId" placeholder="请输入要查询病例ID" :prefix-icon="Search" clearable></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="handleAddCase" type="primary" :icon="CirclePlus">新增病例</el-button>
        </el-col>
      </el-row>
      <el-row class="header-select-row" :gutter="10">
        <el-col :span="4">
          <div class="select-area">
            <label>疾病分类</label>
            <el-select v-model="query.diseaseType" placeholder="请选择要查询的内容" clearable>
              <el-option
                v-for="item in diseaseType"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="select-area">
            <label>诊断状态</label>
            <el-select v-model="query.diagnosisStatus" placeholder="请选择要查询的内容" clearable>
              <el-option
                v-for="item in diagnosisStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
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
              <el-icon @click="handleViewCase(tableData[scope.$index].caseId)">
                <View></View>
              </el-icon>
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
  import { Search, View, Edit, Delete, CirclePlus } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'

  const query = ref({
    caseId: '',
    diseaseType: '',
    diagnosisStatus: '',
    checkType: ''
  })

  const diseaseType = [
    { label: '正常', value: '0' },
    { label: '糖尿病', value: '1' },
    { label: '青光眼', value: '2' },
    { label: '白内障', value: '3' },
    { label: 'AMD', value: '4' },
    { label: '高血压', value: '5' },
    { label: '近视', value: '6' },
    { label: '其他疾病', value: '7' }
  ]
  const diagnosisStatus = [
    { label: '未诊断', value: '0' },
    { label: '诊断中', value: '1' },
    { label: '已诊断', value: '2' }
  ]

  const tableData = [
    {
      caseId: '123456',
      patientId: '123456',
      patientName: '张三',
      age: '20',
      gender: '男',
      diagnosisStatus: '未诊断',
      updateTime: '2021-01-01'
    },
    {
      caseId: '123458',
      patientId: '123456',
      patientName: '张三',
      age: '20',
      gender: '男',
      diagnosisStatus: '未诊断',
      updateTime: '2021-01-01'
    }
  ]

  const router = useRouter()
  function handleAddCase() {
    console.log('新增病例')
    router.push('/fu')
  }

  function handleViewCase(index: number | string) {
    console.log('查看病例' + index)
    router.push(`/dd/${index}`)
  }
</script>

<style scoped lang="scss">
  @import 'styles';
</style>
