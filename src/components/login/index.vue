<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
      <el-form-item>
        <span class="svg-container">
          <svg-icon :icon-class="'user'"></svg-icon>
        </span>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="svg-container">
          <svg-icon :icon-class="'password'"></svg-icon>
        </span>
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item class="loginBtn">
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { isValidUsername } from 'utils/validate'
  export default {
    data () {
      const validateUsername = function (rule, value, cb) {
        if (isValidUsername(value)) {
          cb(new Error('用户名不正确'))
        } else {
          cb()
        }
      }
      const validatePassword = function (rule, value, cb) {
        if (value.length < 6) {
          cb(new Error('长度需大于等于6位'))
        } else {
          cb()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: 'zhanjuntong'
        },
        loginRules: {
          username: [{required: true, trigger: blur, validator: validateUsername}],
          password: [{required: true, trigger: blur, validator: validatePassword}]
        }
      }
    },
    methods: {
      login () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.$store.dispatch('hideLogin', false).then(() => {
                this.$router.push({path: '/'})
              })
            })
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .login {
    height: 100vh;
    background: #304156;
    overflow: hidden;
    .el-form {
      width: 300px;
      margin: 150px auto;
      &-item__content {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
      }
     .el-input {
       width: 75%;
       input {background:transparent;border: none;padding: 25px 0;color: #fff;}
     }
      .el-input__inner {
        width: 200px;
      }
      .svg-container {
        padding: 0 5px 0 15px;
      }
      .loginBtn .el-form-item__content {
        background: transparent;
        button {width: 100%;}
      }
    }
  }
</style>
