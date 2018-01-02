<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" @click="visible = true" type="primary">上传图片</el-button>
    <el-dialog :visible.sync="visible">
      <el-upload action="https://httpbin.org/post" :file-list="fileList" :multiple="true" :show-file-list="true"  list-type="picture-card" :before-upload="beforeUpload" :on-success="handleSuccess" :on-remove="handleRemove">
        <el-button type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'imageUpload',
    data () {
      return {
        visible: false,
        fileList: [],
        listObj: {}
      }
    },
    methods: {
      beforeUpload (file) {
        const _this = this
        const fileName = file.uid
        this.listObj[fileName] = {}
        const URL = window.URL || window.webkitURL
        return new Promise((resolve, reject) => {
          const image = new Image()
          image.src = URL.createObjectURL(file)
          image.onload = function () {
            _this.listObj[fileName] = { isSuccess: false, uid: file.uid, width: this.width, height: this.height }
          }
          resolve(true)
        })
      },
      handleSuccess (response, file) {
        const uid = file.uid
        const listKeyArr = Object.keys(this.listObj)
        for (let i = 0; i < listKeyArr.length; i++) {
          if (this.listObj[listKeyArr[i]].uid === uid) {
            this.listObj[listKeyArr[i]].url = response.files.file
            this.listObj[listKeyArr[i]].isSuccess = true
            return
          }
        }
      },
      handleRemove (file) {
        const uid = file.uid
        const listKeyArr = Object.keys(this.listObj)
        for (let i = 0; i < listKeyArr.length; i++) {
          if (this.listObj[listKeyArr[i]].uid === uid) {
            delete this.listObj[listKeyArr[i]].uid
            return
          }
        }
      },
      handleSubmit () {
        const arr = Object.keys(this.listObj).map(item => this.listObj[item])
        if (!this.checkAllSuccess()) {
          this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
          return
        }
        this.$emit('uploadSuccess', arr)
        this.listObj = {}
        this.fileList = []
        this.visible = false
      },
      checkAllSuccess () {
        return Object.keys(this.listObj).every(item => this.listObj[item].isSuccess)
      }
    }
  }
</script>
<style lang="less">
  .upload-container .el-upload { width: 100%; margin-bottom: 20px; }
</style>
