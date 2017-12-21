<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="loginRules">
      <el-form-item label="账号">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
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
                console.log(2)
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
      width: 400px;
      margin: 150px auto;
      &-item__label {
         color: #fff;
      }
      .el-input__inner {
        width: 300px;
      }
    }
  }
</style>
