<script setup lang="ts">
import { ref } from 'vue'
import {Key, User} from "@element-plus/icons-vue";
import logo from '@/assets/logo/logo.svg'
const query = ref({
  name: '',
  password: '',
})
const registerQuery = ref({
  name:'',
  gender:'',
  phone:'',
  idCard:'',
  proDoctorId:'',
  hospital:'',
  department:'',
  position:'',
  password:'',
  confirmPassword:''
})
const login = () => {
  console.log(query.value)
}
const loginContainer = ref<HTMLDivElement>();
const emit = defineEmits(['containerClick'])
const containerClick = () => {
  emit('containerClick');
}
const registerShow = ref(false);
function handleRegisterShow() {
  registerShow.value = !registerShow.value;
}
</script>

<template>
  <div class="login-container"  ref="loginContainer" @click="containerClick">
    <div class="login-content" :class="{'register-content': registerShow}" @click.stop>
      <div class="login-content__logo" v-show="!registerShow">
        <img class="logo" :src="logo" alt="logo" width="180px" height="60px">
      </div>
      <div class="login-content__title" v-show="!registerShow">
        医生登录
      </div>
      <div class="login-content__form" v-show="!registerShow">
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
      <div class="login-content__register" v-show="!registerShow">
        <a href="#" @click="handleRegisterShow">去注册</a>
      </div>


<!--     注册表单-->
      <div class="register-content__title" v-show="registerShow">
        <span>医生注册</span>
      </div>
      <div class="register-content__text" v-show="registerShow">
        <span> 加入我们的医疗团队，为您提供更好的医疗服务</span>
      </div>
      <div class="register-content__form" v-show="registerShow">
        <el-form>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="username" label="姓名" label-position="top">
                <el-input placeholder="请输入真实姓名" v-model="registerQuery.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="gender" label="性别" label-position="top">
                <el-radio-group v-model="registerQuery.gender" label="性别" label-position="top" >
                  <el-radio value="male" size="large">男</el-radio>
                  <el-radio value="female" size="large">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="phone" label="手机号" label-position="top">
                <el-input placeholder="请输入手机号" v-model="registerQuery.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="idCard" label="身份证号" label-position="top">
                <el-input placeholder="请输入身份证号" v-model="registerQuery.idCard"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item prop="proDoctorId" label="执业医师证号" label-position="top">
                <el-input placeholder="请输入执业医师证号" v-model="registerQuery.proDoctorId"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item prop="hospital" label="所属医院" label-position="top">
                <el-input placeholder="请输入医院" v-model="registerQuery.hospital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="department" label="所属科室" label-position="top">
                <el-input placeholder="请输入科室" v-model="registerQuery.department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="position" label="职位" label-position="top">
                <el-input placeholder="请输入职称" v-model="registerQuery.position"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="password" label="密码" label-position="top">
                <el-input placeholder="请输入密码" v-model="registerQuery.password" type="password" show-password></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="confirmPassword" label="确认密码" label-position="top">
                <el-input placeholder="请确认密码" v-model="registerQuery.confirmPassword" type="password" show-password></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" >注册</el-button>
          </el-form-item>
        </el-form>
    </div>
      <div class="register-content--login" v-show="registerShow">
        <a href="#">已有账号？<span @click="handleRegisterShow">去登陆</span></a>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import './styles.scss';
</style>