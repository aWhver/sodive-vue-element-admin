<template>
  <div class="login">
    <el-form ref="from" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login () {}
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
