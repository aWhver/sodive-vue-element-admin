<template>
  <div class="edit-main-task">
    <el-form inline label-position="right" label-width="120px" :model="taskForm" ref="taskForm" :rules="taskRules">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="taskForm.taskName"></el-input>
      </el-form-item>
      <el-form-item label="任务描述" prop="taskDescription">
        <el-input v-model="taskForm.taskDescription"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶" prop="top">
        <el-radio-group v-model="taskForm.top">
          <el-radio label="yes">否</el-radio>
          <el-radio label="no">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务周期" prop="taskCircle">
        <el-radio-group v-model="taskForm.taskCircle">
          <el-radio label="noLimit">无时间限制</el-radio>
          <el-radio label="limit">任务时间周期&nbsp;&nbsp;<el-date-picker type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="taskForm.datetimeMerge"></el-date-picker></el-radio>
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
      <el-form-item style="text-align: center">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  import { addTask, editTask } from 'api/operationManage'
  import { formatTime } from 'utils/index'
  export default {
    data () {
      // let taskForm
      /* const validateTaskCircle = function (rule, value, cb) {
        if (!value) {
          cb(new Error('请选择任务周期'))
          return
        }
        if (value === '1' && ((taskForm.datetime && taskForm.datetime.length === 0) || taskForm.datetime === null)) { /!* 判断null是因为clearable的时候 taskForm.datetime不存在 *!/
          cb(new Error('请选择任务开始和结束时间'))
        }
      } */
      return {
        taskForm: {
          taskId: (Math.random() * 10000000).toFixed(0),
          taskName: '',
          taskDescription: '',
          top: 'yes',
          taskCircle: '',
          datetimeMerge: [],
          showRegion: '',
          detail: '',
          createTime: '',
          updateTime: '',
          status: 'effective',
          subTask: [],
          userNumberRecord: []
        },
        taskRules: {
          taskName: [{required: true, trigger: 'blur', message: '请输入任务名称'}],
          taskDescription: [{required: true, trigger: 'blur', message: '请对任务进行描述'}],
          taskCircle: [{required: true, trigger: 'change', message: '请选择任务周期'}],
          showRegion: [{required: true, trigger: 'change', message: '请选择显示地区'}],
          detail: [{required: true, trigger: 'blur', message: '请输入详情'}]
        }
      }
    },
    created () { this.editDetail() },
    methods: {
      editDetail () {
        if (this.$route.params.taskId) {
          editTask(this.$route.params.taskId).then(response => {
            this.taskForm = response.data.filteredTask
            this.taskForm.updateTime = formatTime()
          })
        }
      },
      submitForm () {
        this.$refs.taskForm.validate(valid => {
          if (valid) {
            if (this.$route.params.taskId) {
              this.$notify({
                title: '修改成功',
                message: '修改主任务成功',
                type: 'success'
              })
            } else {
              this.taskForm.createTime = formatTime()
              addTask(this.taskForm).then(() => {
                if (this.taskForm.taskCircle === '1' && (this.taskForm.datetimeMerge === null || this.taskForm.datetimeMerge.length === 0)) {
                  this.$message.warning('请选择任务开始和结束时间')
                  return
                }
                this.$notify({
                  title: '新增成功',
                  message: '新增主任务成功',
                  type: 'success'
                })
              })
            }
          }
        })
      },
      resetForm () {
        this.taskForm = {
          taskId: (Math.random() * 10000000).toFixed(0),
          taskName: '',
          taskDescription: '',
          top: '0',
          taskCircle: '',
          datetimeMerge: [],
          showRegion: '',
          detail: '',
          createTime: '',
          updateTime: '',
          status: 'effective'
        }
        this.$refs.taskForm.clearValidate()
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
