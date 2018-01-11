<template>
  <div class="discover-add-container">
    <el-form inline :model="coverForm" ref="coverForm" :rules="coverRules" :label-position="'right'" label-width="120px">
      <el-form-item label="发布者ID" prop="userId">
        <el-input v-model="coverForm.userId" clearable></el-input>
      </el-form-item>
      <el-form-item label="上传图片" style="display: block">
        <el-upload action="https://httpbin.org/post" :multiple="false" list-type="picture-card" :limit="1" :before-upload="beforeUpload" :on-exceed="handleExceed" :on-success="handleSuccess" :on-progress="handleProgress" :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">图片小超过2M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="图片位置信息" class="imageInfo" required style="display: block">
        <el-select v-model="country" clearable>
          <el-option v-for="item in countryMap" :label="item.name" :value="item.key" :key="item.key"></el-option>
        </el-select>
        <el-form-item prop="city">
          <el-input v-model="coverForm.city" placeholder="城市" clearable></el-input>
        </el-form-item>
        <el-form-item prop="site">
          <el-input v-model="coverForm.site" placeholder="潜点" clearable></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="审核状态" style="display: block"><h3>通过</h3></el-form-item>
      <el-form-item style="display: block;width: 400px;text-align: center">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'discoverAdd',
    data () {
      return {
        country: '',
        countryMap: [
          {key: 'cn', name: '中国'},
          {key: 'us', name: '美国'},
          {key: 'nsl', name: '新西兰'}
        ],
        coverForm: {
          userId: '',
          city: '',
          site: ''
        },
        coverRules: {
          userId: [ {required: true, trigger: 'blur', message: '发布者ID不能为空'} ],
          city: [ {required: true, trigger: 'blur', message: '城市不能为空'} ],
          site: [ {required: true, trigger: 'blur', message: '潜点不能为空'} ]
        },
        imageSuccess: false
      }
    },
    methods: {
      submitForm () {
        this.$refs.coverForm.validate(valid => {
          if (valid && this.imageSuccess) {
            this.$notify({
              title: '发布成功',
              message: '发布成功',
              type: 'success'
            })
          } else {
            this.$message.warning('请等待图片上传成功')
          }
        })
      },
      resetForm () {
        this.$refs.coverForm.resetFields()
      },
      beforeUpload (file) {
        const isLimitSize = file.size / 1024 / 1024 > 2
        this.imageSuccess = false
        if (isLimitSize) {
          this.$message.error('您上传的图片超过2M,请选择小于2M的图片进行上传')
        }
      },
      handleSuccess () { this.imageSuccess = true },
      handleRemove () { this.imageSuccess = false },
      handleExceed (files) {
        this.$message.warning('限上传1张图片')
      },
      handleProgress (event, file, fileList) {
        console.log(event)
        console.log(file)
        console.log(fileList)
      }
    }
  }
</script>
<style lang="less">
  .discover-add-container {
    .el-form--inline {
      width: 500px;
      margin: auto;
      .imageInfo {
        display: block !important;
        .el-input {
          width: 300px;
          margin: 15px 0 0;
          display: block;
        }
        .el-form-item__content .el-form-item { margin-top: 15px; }
      }
    }
  }
</style>
