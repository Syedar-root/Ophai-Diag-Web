<template>
  <div class="cm-container">
    <div class="cm-header">
      <el-row class="cm-header__input-row" :gutter="4">
        <el-col :span="21">
          <el-input
            v-model="query.patientInfoPatientId"
            placeholder="请输入要查询病例ID"
            :prefix-icon="Search"
            clearable
            @keyup.enter="handleSearch"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button @click="handleAddCase" type="primary" :icon="CirclePlus">新增病例</el-button>
        </el-col>
      </el-row>
      <el-row class="cm-header__select-row" :gutter="10">
        <el-col :span="4">
          <div class="select-area">
            <label>疾病分类</label>
            <el-select v-model="query.diseaseType" placeholder="请选择要查询的内容" clearable @blur="handleSearch">
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
            <el-select v-model="query.diagStatus" placeholder="请选择要查询的内容" clearable @blur="handleSearch">
              <el-option
                v-for="item in diagStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="cm-main">
      <el-table :data="tableData.items" header-row-class-name="tb-header-row-style" :row-style="{minHeight: '80px'}">
        <el-table-column prop="caseId" label="病例ID" width="200"></el-table-column>
        <el-table-column prop="patientId" label="患者ID" width="200"></el-table-column>
        <el-table-column prop="patientName" label="患者姓名" width="auto"></el-table-column>
        <el-table-column prop="age" label="年龄" width="auto"></el-table-column>
        <el-table-column prop="gender" label="性别" width="auto">
          <template #default="scope">
            {{ gender.find(item => item.value === scope.row.gender)?.label || '未知状态' }}
          </template>
        </el-table-column>
        <el-table-column prop="diseaseType" label="疾病类型" width="auto">
          <template #default="scope">
            <div>
              <el-tag v-for="item in tableData.items[scope.$index].diseaseType" type="primary">{{item}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="diagStatus" label="诊断状态" width="auto">
          <template #default="scope">
            {{ diagStatus.find(item => item.value === scope.row.diagStatus)?.label || '未知状态' }}
          </template>
        </el-table-column>
        <el-table-column prop="responsibleDoctor" label="责任医师" width="auto"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="auto">
          <template #default="scope">
            {{ formatDate(tableData.items[scope.$index].createDate, true) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateDate" label="更新时间" width="auto">
          <template #default="scope">
            {{ formatDate(tableData.items[scope.$index].updateDate, true) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="auto">
          <template #default="scope">
            <div class="table-opt">
              <el-icon @click="handleViewCase(tableData.items[scope.$index]?.caseId)">
                <View></View>
              </el-icon>
              <el-icon><Delete></Delete></el-icon>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cm-footer">
      <el-pagination
        v-model:current-page="query.pageNum"
        background
        layout="total,prev,pager,next"
        :total="tableData.total"
        @click="handleSearch(true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Search, View, Delete, CirclePlus } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  import { type CaseListQuery, type CaseListViewObj } from '@/view/cm/types.ts'
  import { getCaseListService } from '@/api/cm'
  import { getCaseListViewObj } from '@/view/cm/types.ts'

  onMounted(() => {
    handleSearch()
  })

  const query = ref<CaseListQuery>({
    pageNum: 1,
    pageSize: 10,
    patientInfoPatientId: '',
    diseaseType: -1,
    diagStatus: -1
  })

  const diseaseType = [
    { label: '全部', value: -1 },
    { label: '糖尿病', value: 1 },
    { label: '青光眼', value: 2 },
    { label: '白内障', value: 3 },
    { label: 'AMD', value: 4 },
    { label: '高血压', value: 5 },
    { label: '近视', value: 6 },
    { label: '其他疾病', value: 7 }
  ]
  const diagStatus = [
    { label: '全部', value: -1 },
    { label: '未诊断', value: 1 },
    { label: '诊断中', value: 2 },
    { label: '已诊断', value: 3 }
  ]

  const gender = [
    { label: '男', value: 0 },
    { label: '女', value: 1 },
    { label: '其他', value: -1 }
  ]

  const tableData = ref<CaseListViewObj>({
    items: [],
    total: 1
  })

  const router = useRouter()
  function handleAddCase() {
    console.log('新增病例')
    router.push('/fu')
  }

  function handleViewCase(index: number | string) {
    console.log('查看病例' + index)
    router.push(`/dd/${index}`)
  }

  function handleSearch(isPage: boolean = false) {
    if (isPage) {
      query.value.pageNum = 1
    }
    console.log(query.value)
    getCaseListService(query.value).then(res => {
      // 映射数据
      tableData.value = getCaseListViewObj(res);
    })
  }

  const formatDate = (dateArray: string, dateTime:boolean = false) => {
    if (!dateArray || dateArray.length < 5) return '无效日期'
    const [year, month, day, hour, time] = dateArray
    // 使用 padStart 补零
    const paddedMonth = month.toString().padStart(2, '0')
    const paddedDay = day.toString().padStart(2, '0')
    if(dateTime){
      const paddedHour = hour.toString().padStart(2, '0')
      const paddedTime = time.toString().padStart(2, '0')
      return `${year}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedTime}`;
    }
    return `${year}-${paddedMonth}-${paddedDay}`
  }
</script>

<style scoped lang="scss">
  @use 'styles';
</style>
