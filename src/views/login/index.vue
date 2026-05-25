<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { useUserStore } from "@/store/modules/user"

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

// const _loginCallBack = (res: CallbackTypes.CodePopupResponse) => {
//   loading.value = true
//   userStore
//     .login(res.code)
//     .then(async () => {
//       const firstRoute = userStore.getFirstPermissionRoute()
//       await router.push(firstRoute)
//     })
//     .finally(() => {
//       loading.value = false
//     })
// }
const loginByEmail = async () => {
  loading.value = true
  try {
    await userStore.loginByEmail(email.value, password.value)
    await router.push("/")
  } catch (error) {
    console.error("Login failed:", error)
  } finally {
    loading.value = false
  }
}
const registerByEmail = () => {
  loading.value = true
  userStore
    .register(email.value, password.value)
    .then(async () => {
      const firstRoute = userStore.getFirstPermissionRoute()
      await router.push(firstRoute)
    })
    .finally(() => {
      loading.value = false
    })
}

const email = ref("")
const password = ref("")
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .sample-check {
    position: fixed;
    top: 5%;
    left: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    // background-color: #001427 !important;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        // padding: 0;
        // overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        // width: 100%;
        // margin-top: 10px;
      }
    }
  }
}
.content {
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.el-form-item {
  width: calc(100%) !important;
}
.el-form-item-2 {
  width: calc(100% / 2) !important;
}
</style>
<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <!--    <el-button type="info" icon="Iphone" circle class="sample-check" @click="showSampleLogin" />-->
    <div class="login-card">
      <div class="title">
        <!--        <img src="@/assets/layout/login-logo.png" pt-5 />-->
      </div>
      <div class="content">
        <!-- get auth code -->
        <!--        <el-button type="default" :plain="true" :loading="loading" style="width: 220px" @click="googleLogin">-->
        <!--          <SvgIcon name="google" mr-3 />-->
        <!--          Login by Google Account-->
        <!--        </el-button>-->
        <el-form class="flex flex-wrap">
          <el-form-item class="el-form-item" label="Email">
            <el-input v-model="email" placeholder="Please input your email" />
          </el-form-item>
          <el-form-item class="el-form-item" label="Password">
            <el-input type="password" v-model="password" placeholder="Please input your password" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" :loading="loading" @click="registerByEmail" round> Register </el-button>
            <el-button type="primary" :loading="loading" @click="loginByEmail" round> Login </el-button>
          </el-form-item>
        </el-form>
        <!-- <el-row style="width: 100%">
          <el-divider style="width: 45%; margin-right: auto" />
          <div style="display: flex; align-items: center">or</div>
          <el-divider style="width: 45%; margin-left: auto" />
        </el-row>
        <el-row style="width: 100%">
          <el-select style="width: 70%; margin-left: 5px" v-model="userKey">
            <el-option v-for="item in labList" :key="item.id" :label="item.email" :value="item.key" />
          </el-select>
          <el-button style="width: 20%; margin-left: 20px" type="default" @click="SampleLogin">Apply</el-button>
        </el-row> -->
      </div>
    </div>
  </div>
  <!--  <el-dialog v-model="sampleVisible" width="30%" :close-on-click-modal="false" top="30vh">-->
  <!--    <template #header>-->
  <!--      <h2 text-center>Sample Apply</h2>-->
  <!--    </template>-->
  <!--    <div style="display: flex; justify-content: center; align-items: center; height: 100px">-->
  <!--      <el-select style="width: 70%" v-model="userKey" placeholder="Please select a lab">-->
  <!--        <el-option v-for="item in labList" :key="item.id" :label="item.email" :value="item.key" />-->
  <!--      </el-select>-->
  <!--      <div style="width: 5%" />-->
  <!--      <el-button style="width: 20%" type="primary" @click="SampleLogin">Apply</el-button>-->
  <!--    </div>-->
  <!--  </el-dialog>-->
</template>
