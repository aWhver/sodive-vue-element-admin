<template>
  <div class="task-manage-container">
    <el-header>
      <div class="filter-container">
        <div class="filter-item" style="line-height: 60px">
          备注：子任务状态由主任务状态决定，子任务可单独设置状态是否启用
        </div>
        <div class="filter-item fr">
          <router-link to="/operationManagement/taskManage/editTask">
            <el-button type="primary">新增主任务<i class="el-icon-circle-plus"></i></el-button>
          </router-link>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="任务名称" align="left">
          <template slot-scope="scope">
            <router-link :to="`userNumberRecord/${scope.row.taskId}`">{{ scope.row.taskName }}</router-link>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="170px"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" width="170px"></el-table-column>
        <el-table-column label="显示区域" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.showRegion | regionFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="子任务" width="180px">
          <template slot-scope="scope">
            <el-dropdown split-button type="primary">
              子任务列表
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in  scope.row.subTask" :key="item.subTaskId">
                  <span class="subTaskName" @click="editTask(item)">{{ item.subTaskName }}</span>
                  <el-tag :type="item.subStatus | mainTaskTagFilter ">{{ item.subStatus | taskStatusFilter }}</el-tag>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="主任务状态" width="100px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | mainTaskTagFilter ">{{ scope.row.status | mainTaskFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-dropdown type="primary">
              <el-button type="primary">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button :type="scope.row.status | mainTaskTagFilter" @click="changeSubTaskStatus(scope.row)">{{ scope.row.status | editMainTaskStatus }}</el-button></el-dropdown-item>
                <el-dropdown-item><el-button type="text" @click="visible1 = true">推送消息</el-button></el-dropdown-item>
                <el-dropdown-item><router-link :to="`/operationManagement/taskManage/editTask/${scope.row.taskId}`"><el-button type="text">编辑主任务</el-button></router-link></el-dropdown-item>
                <el-dropdown-item><el-button type="text" @click="addTask(scope.row)">增加子任务</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetTaskManage"></pagination>
    </el-footer>
    <el-dialog title="推送消息" :visible.sync="visible1">
      <el-radio-group v-model="push">
        <el-radio label="all">全部</el-radio>
        <el-radio label="China">中国</el-radio>
        <el-radio label="abroad">海外</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible1 = false">取消</el-button>
        <el-button type="primary" @click="pushInfo">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑/新增子任务" :visible.sync="visible" class="task-container">
      <el-form :model="taskForm" ref="taskForm" :rules="taskRules" >
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="taskDescription">
          <el-input v-model="taskForm.taskDescription"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isAble">
          <el-radio-group v-model="taskForm.isAble">
            <el-radio label="effective">启用</el-radio>
            <el-radio label="ineffective">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { taskManage } from 'api/operationManage'
  import { formatTime } from 'utils/index'
  const taskStatusMap = [
    {status: 'effective', label: '启用中'},
    {status: 'ineffective', label: '停用中'}
  ]
  const taskStatusObj = taskStatusMap.reduce((obj, item) => {
    obj[item.status] = item.label
    return obj
  }, {})
  export default {
    name: 'taskManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1},
        loading: true,
        visible: false,
        visible1: false,
        isEdit: false,
        push: '',
        taskForm: {
          taskName: '',
          taskDescription: '',
          isAble: '',
          subTaskId: null,
          taskId: null
        },
        taskRules: {
          taskName: [ {required: true, trigger: 'blur', message: '请输入子任务名称'} ],
          taskDescription: [ {required: true, trigger: 'blur', message: '请对子任务进行描述'} ],
          isAble: [ {required: true, trigger: 'blur', message: '请选择是否启用'} ]
        }
      }
    },
    created () { this.GetTaskManage() },
    methods: {
      GetTaskManage () {
        this.loading = true
        taskManage(this.listQuery).then(response => {
          this.list = response.data.taskManage
          this.total = response.data.total
          this.loading = false
        })
      },
      changeSubTaskStatus (row) {
        if (row.status === 'effective') {
          row.status = 'ineffective'
          row.subTask.forEach(item => { item.subStatus = 'ineffective' })
        } else {
          row.status = 'effective'
          row.subTask.forEach(item => { item.subStatus = 'effective' })
        }
      },
      pushInfo () {
        if (this.push === '') {
          this.$message.warning('请选择推送对象')
        } else {
          this.$message.success('推送成功')
          this.visible1 = false
        }
      },
      editTask (item) {
        this.visible = true
        this.isEdit = true
        this.taskForm.taskName = item.subTaskName
        this.taskForm.taskDescription = item.taskDescription
        this.taskForm.isAble = item.subStatus
        this.taskForm.subTaskId = item.subTaskId
      },
      submitForm () {
        this.$refs.taskForm.validate(valid => {
          if (valid) {
            if (this.isEdit) {
              for (let [i, item] of this.list.entries()) {
                for (let [j, v] of item.subTask.entries()) {
                  if (v.subTaskId === this.taskForm.subTaskId) {
                    this.list[i].updateTime = formatTime()
                    this.list[i].subTask[j].subTaskName = this.taskForm.taskName
                    this.list[i].subTask[j].taskDescription = this.taskForm.taskDescription
                    this.list[i].subTask[j].subStatus = this.taskForm.isAble
                    this.$notify({
                      title: '编辑成功',
                      message: '成功修改该子任务状态',
                      type: 'success'
                    })
                    break
                  }
                }
              }
            } else {
              for (let [i, item] of this.list.entries()) {
                if (item.taskId === this.taskForm.taskId) {
                  this.list[i].updateTime = formatTime()
                  this.list[i].subTask.push({
                    subTaskName: this.taskForm.taskName,
                    taskDescription: this.taskForm.taskDescription,
                    subStatus: this.taskForm.isAble,
                    subTaskId: (Math.random() * 100000).toFixed(0)
                  })
                  this.$notify({
                    title: '创建成功',
                    message: '成功创建该子任务状态',
                    type: 'success'
                  })
                  break
                }
              }
            }
            this.visible = false
          }
        })
      },
      resetForm () {
        this.taskForm = {
          taskName: '',
          taskDescription: '',
          isAble: '',
          taskId: null
        }
      },
      addTask (row) {
        this.resetForm()
        this.$nextTick(() => {
          this.$refs.taskForm.clearValidate()
        })
        this.taskForm.taskId = row.taskId // 获取要修改的主任务的ID
        this.isEdit = false
        this.visible = true
      }
    },
    filters: {
      regionFilter (region) {
        const regionObj = {'all': '全部', 'China': '中国', 'abroad': '海外'}
        return regionObj[region]
      },
      mainTaskFilter (status) {
        const statusMap = {'ineffective': '失效', 'effective': '正常'}
        return statusMap[status]
      },
      mainTaskTagFilter (status) {
        const statusMap = {'ineffective': 'danger', 'effective': 'success'}
        return statusMap[status]
      },
      editMainTaskStatus (status) {
        const statusMap = {'ineffective': '启用主任务', 'effective': '停用主任务'}
        return statusMap[status]
      },
      taskStatusFilter (status) {
        return taskStatusObj[status]
      },
      taskTagFilter (status) {
        const tagStatusObj = {
          'effective': 'success',
          'ineffective': 'danger'
        }
        return tagStatusObj[status]
      }
    }
  }
</script>
<style lang="less" scoped>
.task-manage-container a, .subTaskName {
  color: #52a4de
}
.el-dropdown-menu {
  a { color: #52a4de; }
  .el-tag { cursor: default; }
}
.task-container .el-dialog{
  width: 400px;
  &__footer {text-align: center}
}
</style>
