<template>
  <div class="sodive-container">
    <el-form inline :model="sodiveForm" ref="sodiveForm" :rules="sodiveRules">
      <el-form-item label="文章标题" prop="title">
        <el-input clearable v-model="sodiveForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input clearable v-model="sodiveForm.description"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-radio-group v-model="sodiveForm.top">
          <el-radio label="yes">是</el-radio>
          <el-radio label="no">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload action="https://httpbin.org/post" list-type="picture-card" :file-list="sodiveForm.programaImage" :on-success="handleSuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="栏目" prop="programa">
        <el-select v-model="sodiveForm.programa">
          <el-option v-for="item in programaMap" :key="item.programa" :value="item.programa" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="detail">
        <tinymce :height="300" v-model="sodiveForm.detail"></tinymce>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button>重置</el-button>
        <el-button type="primary" @click="submitForm">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  import { formatTime } from 'utils/index'
  import { editSodive, getSodive } from 'api/operationManage'
  export default {
    name: 'editSodive',
    data () {
      return {
        programaMap: [{programa: 'sodive', label: 'sodive学院'}],
        routeId: this.$route.params.id, // 区分是新增还是编辑
        sodiveForm: {
          id: (Math.random() * 100000000).toFixed(0),
          title: '',
          description: '',
          top: '',
          programaImage: [],
          createTime: '',
          programa: '',
          detail: '',
          status: 'draft'
        },
        sodiveRules: {
          title: [{required: true, trigger: 'blur', message: '文章标题不能为空'}],
          description: [{required: true, trigger: 'blur', message: '文章描述不能为空'}],
          // programaImage: [{required: true, trigger: 'blur', message: '请上传文章缩略图'}],
          programa: [{required: true, trigger: 'blur', message: '请选择文章栏目'}],
          detail: [{required: true, trigger: 'blur', message: '文章内容不能为空'}]
        }
      }
    },
    created () { this.GetSodive() },
    methods: {
      submitForm () {
        this.$refs.sodiveForm.validate(valid => {
          if (valid) {
            this.sodiveForm.createTime = formatTime()
            editSodive(this.sodiveForm, this.routeId).then(response => {
              this.$message.success('发布成功')
            })
          }
        })
      },
      GetSodive () {
        getSodive(this.$route.params.id).then(response => {
          this.sodiveForm = response.data.sodiveDetail
        })
      },
      handleSuccess (response, file) {
        this.sodiveForm.programaImage.push({name: file.name, url: file.url})
      }
    },
    components: { tinymce }
  }
</script>
<style lang="less">
  .sodive-container {
    .el-form {
      width: 800px;
      margin: auto;
      &-item {
        display: block;
        &__content {
           width: 85%;
        }
      }
    }
  }

</style>
