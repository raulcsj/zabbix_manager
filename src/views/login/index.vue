<template>
  <div class="login-container">
    <div class="header">
      <div><img class="zabbix-logo" src="@/assets/login_images/zabbix_logo.png" width="130" height="30" alt="zabbix"></div><div class="title">{{ title | showTitle }}</div>
    </div>

    <el-row :gutter="20">
      <el-col :span="15">
        <div class="slogan">
          <h1>适合企业的监控解决方案</h1>
          <h2>成熟的企业级监控平台，适用于多种环境</h2>
        </div>
      </el-col>
      <el-col :span="9">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

          <div class="title-container">
            <h3 class="title">用户登录</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password" style="margin-top: 40px;">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <el-button :loading="loading" type="primary" style="width:100%;margin-top:10px;" @click.native.prevent="handleLogin">登录</el-button>

        </el-form>
      </el-col>
    </el-row>
    <div class="copyright">
      <p>© 上海宏时数据系统有限公司. All Rights Reserved</p>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

import { mapState } from 'vuex'

export default {
  name: 'Login',
  filters: {
    showTitle(title) {
      return title.replace('zabbix', '')
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapState({
      title: state => state.settings.title
    })
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$cursor: black;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {

  .el-input {
    display: inline-block;
    height: 48px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $cursor;
      height: 48px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #dadada;
    border-radius: 5px;
    color: #6e6e6e;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$teal: #1e5286;
$bg_color:rgba(255,255,255,1);

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg url(~@/assets/login_images/login_bg_1.png) no-repeat center center / cover;
  overflow: hidden;

  .header{
    height:60px;
    line-height: 60px;
    font-size:22px;
    padding-left: 40px;
    font-weight: bold;
    color: $teal;
    background:$bg_color;
    box-shadow: 4px 4px 10px rgba(0,0,0,.2);
    .zabbix-logo{
      float: left;
      margin-top: 14px;
      margin-right: 6px;
    }
    .title{
      float: left;
    }
  }

  .slogan{
    text-align: center;
    margin-top: 30%;
    color: white;
  }

  .login-form {
    position: relative;
    background-color: $bg_color;
    width: 400px;
    height: 360px;
    max-width: 100%;
    margin-top: 30%;
    padding:10px 35px 20px 35px;
    box-shadow: 0 20px 20px rgba(0,0,0,.2);
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $teal;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      color: $teal;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $teal;
    cursor: pointer;
    user-select: none;
  }

  .copyright{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    height: 3rem;
    color: #828282;
    background:$bg_color
  }
}
</style>
