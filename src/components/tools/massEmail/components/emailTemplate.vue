<template>
  <div>
    <el-form :model="emailForm" :rules="emailRules" ref="emailForm">
      <el-form-item label="语言" prop="language">
        <el-radio-group v-model="emailForm.language">
          <el-radio label="繁体中文">繁体中文</el-radio>
          <el-radio label="简体中文">简体中文</el-radio>
          <el-radio label="英文"></el-radio>
          <el-radio label="韩文"> </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮件标题" prop="title">
        <el-input v-model="emailForm.title" clearable></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <tinymce :height="300" v-model="emailForm.content"></tinymce>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitEmail">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  import { emailDetail } from 'api/massiveEmail'
  export default {
    name: 'emailTemplate',
    data () {
      return {
        emailForm: {
          title: '',
          language: '',
          content: ''
        },
        emailRules: {
          language: [ {required: true, message: '请选择语言', trigger: 'blur'} ],
          title: [ {required: true, message: '标题不能为空', trigger: 'blur'} ],
          content: [ {required: true, message: '邮件内容不能为空', trigger: 'blur'} ]
        }
      }
    },
    created () { this.initContent() },
    watch: {
      $route () { this.initContent() }
    },
    methods: {
      initContent () {
        if (this.$route.params.emailId) {
          emailDetail(this.$route.params.emailId).then(response => {
            console.log(response)
            this.emailForm = {
              title: response.data.emailDetail.title,
              language: response.data.emailDetail.language,
              content: response.data.emailDetail.content
            }
          })
        } else {
          this.emailForm = {
            title: '',
            language: '',
            content: ''
          }
        }
      },
      submitEmail () {
        this.$refs.emailForm.validate(valid => {
          if (valid) {
            if (this.$route.params.emailId) {
              this.$notify({
                title: '操作成功',
                message: '邮件模板修改成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '操作成功',
                message: '邮件模板创建成功',
                type: 'success'
              })
            }
          }
        })
      },
      resetForm () {
        this.$refs.emailForm.resetFields()
      }
    },
    components: { tinymce }
  }
</script>
<style>

</style>
