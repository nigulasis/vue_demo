<template>
  <div class="login-box">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="60px"
      class="loginForm"
    >
      <h1>登陆界面</h1>
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          class="sub-btn"
          type="primary"
          @click="submitForm(loginFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import type { FormInstance } from "element-plus";
import {loginApi} from "@/http/api"
import { useRouter } from "vue-router";

const loginFormRef = ref<FormInstance>();
const router = useRouter()
const loginForm = reactive({
  username: "admin",
  password: "123456",
});

const rules = reactive({
  username: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 24, message: "Length should be 3 to 24", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "Please input Activity password",
      trigger: "blur",
    },
    { min: 3, max: 24, message: "Length should be 3 to 24", trigger: "blur" },
  ],
});

const submitForm = (loginFormRef: FormInstance | undefined) => {
  loginFormRef?.validate((valid: boolean) => {
    if (valid) {
      // console.log("submit!");
      loginApi(loginForm).then(res=>{
        console.log(res);
        localStorage.setItem('token',res.data.token)
        router.push('./')
        })
        
    }
  });
};
</script>

<style scoped >
.login-box {
  width: 100%;
  height: inherit;
  background: rgb(183, 133, 133);
  box-sizing: border-box;
  place-items: center;
  display: grid;
}
.loginForm {
  width: 450px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  margin: auto;
}
.sub-btn {
  width: 100%;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>