<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" @click="visible = true" type="primary">上传图片</el-button>
    <el-dialog :visible.sync="visible">
      <el-upload action="https://httpbin.org/post" :file-list="fileList" :multiple="true" :show-file-list="true" list-type="picture-card" :before-upload="beforeUpload">
        <el-button type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'imageUpload',
    data () {
      return {
        visible: false,
        fileList: []
      }
    },
    methods: {
      beforeUpload (file) {
        console.log(file)
      }
    }
  }
</script>
<style lang="less">
  .upload-container .el-upload { width: 100%; margin-bottom: 20px; }
</style>
