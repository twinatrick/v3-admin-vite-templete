<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { CallbackTypes } from "vue3-google-login"

const router = useRouter()

const loading = ref(false)

const _loginCallBack = (res: CallbackTypes.CodePopupResponse) => {
  loading.value = true
  useUserStore()
    .login(res.code)
    .then(async () => {
      const firstRoute = useUserStore().getFirstPermissionRoute()
      await router.push(firstRoute)
    })
    .finally(() => {
      loading.value = false
    })
}
const loginByEmail = () => {
  loading.value = true
  useUserStore()
    .loginByEmail(email.value, password.value)
    .then(async () => {
      const firstRoute = useUserStore().getFirstPermissionRoute()
      await router.push(firstRoute)
    })
    .finally(() => {
      loading.value = false
    })
}
const registerByEmail = () => {
  loading.value = true
  useUserStore()
    .register(email.value, password.value)
    .then(async () => {
      const firstRoute = useUserStore().getFirstPermissionRoute()
      await router.push(firstRoute)
    })
    .finally(() => {
      loading.value = false
    })
}

const email = ref("")
const password = ref("")

// 建立 WebSocket 連線（請根據實際 URL 調整）

// // 取得螢幕解析度
// const getScreenResolution = () => {
//   return `${window.screen.width}x${window.screen.height}`
// }
// // 取得瀏覽器與作業系統資訊
// const getBrowserAndOSInfo = () => {
//   const userAgent = navigator.userAgent
//   let browser = "Unknown"
//   let os = "Unknown"

//   // 簡單的瀏覽器偵測
//   if (userAgent.indexOf("Chrome") > -1) {
//     browser = "Chrome"
//   } else if (userAgent.indexOf("Firefox") > -1) {
//     browser = "Firefox"
//   } else if (userAgent.indexOf("Safari") > -1) {
//     browser = "Safari"
//   } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
//     browser = "Internet Explorer"
//   }

//   // 簡單的作業系統偵測
//   if (userAgent.indexOf("Win") > -1) {
//     os = "Windows"
//   } else if (userAgent.indexOf("Mac") > -1) {
//     os = "MacOS"
//   } else if (userAgent.indexOf("Linux") > -1) {
//     os = "Linux"
//   } else if (userAgent.indexOf("Android") > -1) {
//     os = "Android"
//   } else if (userAgent.indexOf("like Mac") > -1) {
//     os = "iOS"
//   }
//   return { browser, os }
// }
onMounted(() => {
  // getLabList().then((res) => {
  //   labList.value = res.data
  // })
})
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
