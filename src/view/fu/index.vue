<template>
    <div class="fu-container">
      <div class="fu-container__main">
        <div class="fu-container__left">
          <div class="fu-container__block">
            <div class="fu-container__title">
              <span>图片上传</span>
            </div>
            <el-upload class="fu-container__upload" :on-remove="handleFileRemove" :on-change="handleFileChange" action="#" drag multiple :auto-upload="false" accept=".jpg">
              <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
              <div class="upload--text">图片拖拽到此处或单击此处</div>
              <template #tip>
                <div class="upload--tip">
                  仅支持jpg格式
                </div>
              </template>
            </el-upload>
          </div>

          <div class="fu-container__block">
            <div class="fu-container__title">
              <span>患者信息</span>
            </div>
            <el-form class="fu-container__form" label-position="top" require-asterisk-position="right">
              <el-row :gutter="10" justify="space-between" align="middle">
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
              <el-row :gutter="10" justify="space-between" align="middle">
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
              <el-row justify="space-between" align="middle">
                <el-col :span="24">
                  <el-form-item label="主诉症状">
                    <el-input-tag v-model="query.patientComplaint"></el-input-tag>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

        </div>
        <div class="fu-container__right">
          <div class="fu-container__block" style="flex-direction: row">
            <div class="right__left">
              <div class="fu-container__title">
                <span>左眼</span>
              </div>
              <div class="original">
                <span>原始图像</span>
                <el-image class="fu-container__image" fit="contain" :preview-src-list="srcList" :src="previewImageList.rawLeft">
                  <template #error>
                    <div class="image-slot">
                      <el-icon size="1.5rem"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="process">
                <span>处理后图像</span>
                <el-image class="fu-container__image" fit="contain">
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
                <el-image class="fu-container__image" fit="contain" :preview-src-list="srcList" :src="previewImageList.rawRight">
                  <template #error>
                    <div class="image-slot">
                      <el-icon size="1.5rem"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="process">
                <span>处理后图像</span>
                <el-image class="fu-container__image" fit="contain">
                  <template #error>
                    <div class="image-slot">
                      <el-icon size="1.5rem"><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </div>
          </div>
          </div>

      </div>

      <transition name="move--up">
        <div class="fu-container__footer" v-show="footerShow" ref="footer">
          <el-button>重置</el-button>
          <el-button>提交</el-button>
        </div>
      </transition>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted,computed } from "vue";
import type {ffDTO} from "@/view/fu/types.ts";
import {Picture, UploadFilled} from "@element-plus/icons-vue";

const footerShow = ref<boolean>(false);
onMounted(()=>{
  document.addEventListener("mousemove",(e)=>{
    if (e.y > window.innerHeight/1.5) {
      footerShow.value = true;
    }else {
      footerShow.value = false;
    }
  })
})

const previewImageList = ref<any>({
  rawLeft: '',
  rawRight: '',
  processLeft:'',
  processRight:'',
});

const updatePreviewImages = (uploadFiles: any[]) => {
  // 释放旧URL
  if (previewImageList.value.rawLeft) URL.revokeObjectURL(previewImageList.value.rawLeft);
  if (previewImageList.value.rawRight) URL.revokeObjectURL(previewImageList.value.rawRight);

  let rawLeftFile: File | null = null;
  let rawRightFile: File | null = null;

  uploadFiles.forEach((uploadFile) => {
    const file = uploadFile.raw;
    const fileName = file.name.toLowerCase();

    if (fileName.includes('left')) {
      rawLeftFile = file;
    } else if (fileName.includes('right')) {
      rawRightFile = file;
    }
  });

  previewImageList.value = {
    rawLeft: rawLeftFile ? URL.createObjectURL(rawLeftFile) : '',
    rawRight: rawRightFile ? URL.createObjectURL(rawRightFile) : ''
  };
};

const handleFileChange = (_: any, uploadFiles: any[]) => {
  updatePreviewImages(uploadFiles);
  console.log(previewImageList);
};

const handleFileRemove = (_: any, uploadFiles: any[]) => {
  updatePreviewImages(uploadFiles);
};

// 组件卸载时释放资源
onUnmounted(() => {
  if (previewImageList.value.rawLeft) URL.revokeObjectURL(previewImageList.value.rawLeft);
  if (previewImageList.value.rawRight) URL.revokeObjectURL(previewImageList.value.rawRight);
});

const srcList = computed(()=>{
  return [
    previewImageList.value.rawLeft,
    previewImageList.value.rawRight,
  ]
});


const query = ref<ffDTO>({
  patientId: '',
  patientName: '',
  patientGender: '',
  patientAge:'',
  patientComplaint:[]
});

</script>

<style scoped lang="scss">
@import "styles";
</style>
