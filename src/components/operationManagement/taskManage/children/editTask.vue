<template>
  <div class="edit-main-task">
    <el-form inline label-position="right" label-width="120px">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="taskForm.taskName"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="taskDescription">
        <el-input v-model="taskForm.taskDescription"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶" prop="top">
        <el-radio-group v-model="taskForm.top">
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务周期">
        <el-radio-group v-model="taskForm.taskCircle">
          <el-radio label="0">无时间限制</el-radio>
          <el-radio label="1">任务时间周期&nbsp;&nbsp;<el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="taskForm.datetime"></el-date-picker></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列表图片">
        <el-upload action="https://httpbin.org/post" list-type="picture-card"><i class="el-icon-plus"></i></el-upload>
      </el-form-item>
      <el-form-item label="首页广告位">
        <el-upload action="https://httpbin.org/post" list-type="picture-card"><i class="el-icon-plus"></i></el-upload>
      </el-form-item>
      <el-form-item label="显示地区" prop="showRegion">
        <el-radio-group v-model="taskForm.showRegion">
          <el-radio label="all">全部</el-radio>
          <el-radio label="China">中国</el-radio>
          <el-radio label="abroad">海外</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详情" prop="detail">
        <tinymce :height="300" v-model="taskForm.detail"></tinymce>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  export default {
    data () {
      return {
        taskForm: {
          taskName: '',
          taskDescription: '',
          top: '',
          taskCircle: '',
          datetime: [],
          showRegion: '',
          detail: ''
        }
      }
    },
    components: { tinymce }
  }
</script>
<style lang="less">
.edit-main-task .el-form--inline {
  width: 800px;
  margin: auto;
  .el-form-item {
    width: 100%;
    &__content {
       width: 85%;
     }
  }
}
</style>
