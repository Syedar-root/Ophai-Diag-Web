<script setup lang="ts">
import { ref } from 'vue'
import {Key, User} from "@element-plus/icons-vue";
const query = ref({
  name: '',
  password: '',
})
const login = () => {
  console.log(query.value)
}
const loginContainer = ref<HTMLDivElement>();
const emit = defineEmits(['containerClick'])
const containerClick = () => {
  emit('containerClick');
}
</script>

<template>
  <div class="login-container" ref="loginContainer" @click="containerClick">
    <div class="login-content" @click.stop>
      <div class="login-content__logo">
        <span>LOGO</span>
      </div>
      <div class="login-content__title">
        医生登录
      </div>
      <div class="login-content__form">
        <el-form>
          <el-form-item prop="username">
            <el-input placeholder="请输入手机号/账号" v-model="query.name" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="query.password" type="password" :prefix-icon="Key" show-password></el-input>
          </el-form-item>
          <el-form-item class="password-opt">
            <el-checkbox>记住密码</el-checkbox>
            <el-link>忘记密码？</el-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-content__register">
        <a href="#">去注册</a>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import './styles.scss';
</style>