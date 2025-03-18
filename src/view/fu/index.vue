<template>
  <div class="fu-container">
    <div class="fu-container__main">
      <!--        左边-->
      <div class="fu-container__left">
        <div class="fu-container__block">
          <div class="fu-container__title">
            <span>图片上传</span>
            <span class="bulkSwitch">
              <el-switch @change="handBulkUpload" v-model="bulkUpload" active-text="批量上传" />
            </span>
          </div>
          <el-upload
            class="fu-container__upload"
            :show-file-list="bulkUpload"
            v-model:file-list="fileList"
            :limit="limit"
            :on-remove="handleFileRemove"
            :on-change="handleFileChange"
            action="#"
            drag
            multiple
            :auto-upload="false"
            accept=".jpg">
            <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
            <div class="upload--text">图片拖拽到此处或单击此处</div>
            <template #tip>
              <div class="upload--tip">仅支持jpg格式。图片命名需要以"患者ID"+"_left"或"_right"来区分左右眼</div>
            </template>
          </el-upload>
        </div>

        <div class="fu-container__block" v-show="!bulkUpload">
          <div class="fu-container__title">
            <span>患者信息</span>
          </div>
          <el-form class="fu-container__form" label-position="top" require-asterisk-position="right">
            <el-row :gutter="10" justify="space-between">
              <el-col :span="12">
                <el-form-item label="患者ID" required>
                  <el-input v-model="query.patientId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名" required>
                  <el-input v-model="query.patientName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" justify="space-between">
              <el-col :span="12">
                <el-form-item label="性别" required>
                  <el-select v-model="query.patientGender">
                    <el-option label="男" value="male"></el-option>
                    <el-option label="女" value="female"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年龄" required>
                  <el-input v-model="query.patientAge"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row justify="space-between">
              <el-col :span="24">
                <el-form-item label="主诉症状">
                  <el-input-tag v-model="query.patientComplaint"></el-input-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <!--        右边-->
      <div class="fu-container__right">
        <!--          单个上传-->
        <div class="fu-container__block" v-show="!bulkUpload" style="flex-direction: row">
          <div class="right__left">
            <div class="fu-container__title">
              <span>左眼</span>
            </div>
            <div class="original">
              <span>原始图像</span>
              <el-image
                class="fu-container__image"
                fit="contain"
                :preview-src-list="srcList"
                :src="previewImageList.rawLeft">
                <template #error>
                  <div class="image-slot">
                    <el-icon size="1.5rem"><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
          <div class="right__right">
            <div class="fu-container__title">
              <span>右眼</span>
            </div>
            <div class="original">
              <span>原始图像</span>
              <el-image
                class="fu-container__image"
                fit="contain"
                :preview-src-list="srcList"
                :src="previewImageList.rawRight">
                <template #error>
                  <div class="image-slot">
                    <el-icon size="1.5rem"><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>
          </div>
        </div>
        <!--          批量上传-->
        <div class="fu-container__block fu-container__grid" v-show="bulkUpload">
          <div class="grid-item" v-for="(patient, index) in bulkList" :key="index">
            <span>{{ patient.patientId }}</span>
            <el-image
              class="fu-container__image"
              fit="contain"
              :src="patient.previewLeft"
              :preview-teleported="true"
              :preview-src-list="[patient.previewLeft, patient.previewRight]">
              <template #error>
                <div class="image-slot">左眼图片未上传</div>
              </template>
            </el-image>
            <el-image
              class="fu-container__image"
              fit="contain"
              :src="patient.previewRight"
              :preview-teleported="true"
              :preview-src-list="[patient.previewLeft, patient.previewRight]">
              <template #error>
                <div class="image-slot">右眼图片未上传</div>
              </template>
            </el-image>
          </div>
        </div>
      </div>
    </div>

    <transition name="move--up">
      <div class="fu-container__footer" v-show="footerShow" ref="footer">
        <el-button type="info">重置</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue'
  import type { ffDTO, BulkImage } from '@/view/fu/types.ts'
  import { Picture, UploadFilled } from '@element-plus/icons-vue'
  import { validate, imageSchema } from '@/util/validate'

  const footerShow = ref<boolean>(false)
  const bulkUpload = ref<boolean>(false)
  const limit = computed(() => {
    fileList.value = []
    bulkList.value = []
    previewImageList.value = { rawLeft: '', rawRight: '' }
    return bulkUpload.value ? undefined : 2
  })
  onMounted(() => {
    document.addEventListener('mousemove', e => {
      if (e.y > window.innerHeight / 1.5) {
        footerShow.value = true
      } else {
        footerShow.value = false
      }
    })
  })

  const fileList = ref<any>([])
  const bulkList = ref<Array<BulkImage>>([])
  function handBulkUpload() {
    console.log(fileList.value)
  }

  const previewImageList = ref<any>({
    rawLeft: '',
    rawRight: ''
  })

  const updatePreviewImages = async (uploadFiles: any[]) => {
    // 清空旧数据
    if (bulkUpload.value) {
      bulkList.value = []
    } else {
      previewImageList.value = { rawLeft: '', rawRight: '' }
    }

    // 创建临时存储对象（用于批量模式）
    const patientMap = new Map<
      string,
      {
        left?: File
        right?: File
        previewLeft?: string
        previewRight?: string
      }
    >()

    try {
      // 统一处理文件验证
      for (const uploadFile of uploadFiles) {
        const file = uploadFile.raw
        const fileName = file.name.toLowerCase()

        // 验证文件名格式
        await validate({ name: fileName }, imageSchema)

        // 解析患者ID和眼睛类型
        const [patientId, eyeType] = fileName.split('_')
        const upperPatientId = patientId.toUpperCase()

        // 批量模式处理
        if (bulkUpload.value) {
          // 获取或创建患者条目
          const patientEntry = patientMap.get(upperPatientId) || {}

          // 更新眼睛文件（后上传的同类型文件会覆盖之前的）
          if (eyeType.includes('left')) {
            patientEntry.left = file
            patientEntry.previewLeft = URL.createObjectURL(file)
          } else if (eyeType.includes('right')) {
            patientEntry.right = file
            patientEntry.previewRight = URL.createObjectURL(file)
          }
          // 更新Map条目
          patientMap.set(upperPatientId, patientEntry)
        }
        // 单个模式处理
        else {
          query.value.patientId = upperPatientId
          if (eyeType.includes('left')) {
            previewImageList.value.rawLeft = URL.createObjectURL(file)
          } else if (eyeType.includes('right')) {
            previewImageList.value.rawRight = URL.createObjectURL(file)
          }
        }
      }

      // 生成批量模式预览数据
      // 转换Map到bulkList（保证唯一性）
      if (bulkUpload.value) {
        bulkList.value = Array.from(patientMap, ([patientId, files]) => ({
          patientId,
          leftFile: files.left || null,
          rightFile: files.right || null,
          previewLeft: files.previewLeft || '',
          previewRight: files.previewRight || ''
        }))
      }
    } catch (error) {
      console.error('文件验证失败:', error)
      // 清空无效文件
      fileList.value = []
      if (bulkUpload.value) {
        bulkList.value = []
      } else {
        previewImageList.value = { rawLeft: '', rawRight: '' }
      }
      // 这里可以添加ElementPlus的错误提示
    }
  }

  const handleFileChange = (_: any, uploadFiles: any[]) => {
    console.log(uploadFiles)
    console.log(fileList)
    fileList.value = uploadFiles
    updatePreviewImages(fileList.value)
  }

  const handleFileRemove = (_: any, uploadFiles: any[]) => {
    fileList.value = uploadFiles
    updatePreviewImages(fileList.value)
  }

  // 组件卸载时释放资源
  onUnmounted(() => {
    if (previewImageList.value.rawLeft) URL.revokeObjectURL(previewImageList.value.rawLeft)
    if (previewImageList.value.rawRight) URL.revokeObjectURL(previewImageList.value.rawRight)
  })

  const srcList = computed(() => {
    return [previewImageList.value.rawLeft, previewImageList.value.rawRight]
  })

  const query = ref<ffDTO>({
    patientId: '',
    patientName: '',
    patientGender: '',
    patientAge: null,
    patientComplaint: []
  })

  // 修改提交处理函数
  const handleSubmit = () => {
    if (bulkUpload.value) {
      // 批量提交逻辑
      const submitData = bulkList.value.map(patient => ({
        patientId: patient.patientId,
        // 这里可以添加其他需要提交的字段
        leftFile: patient.leftFile,
        rightFile: patient.rightFile
      }))
      console.log('批量提交数据:', submitData)
      // TODO: 调用实际API接口
    } else {
      // 单个提交逻辑
      console.log('单个提交数据:', query.value)
      // TODO: 调用实际API接口
    }
  }
</script>

<style scoped lang="scss">
  @import 'styles';
</style>
