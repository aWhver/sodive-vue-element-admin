<template>
  <div class="task-manage-container">
    <el-header>
      <div class="filter-container">
        <div class="filter-item" style="line-height: 60px">
          备注：子任务状态由主任务状态决定，子任务可单独设置状态是否启用
        </div>
        <div class="filter-item fr">
          <router-link to="taskManage/editTask">
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
                  <span class="subTaskName">{{ item.subTaskName }}</span>
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
        <el-table-column label="操作" width="330px">
          <template slot-scope="scope">
            <el-button :type="scope.row.status | mainTaskTagFilter" @click="changeSubTaskStatus(scope.row)">{{ scope.row.status | editMainTaskStatus }}</el-button>
            <el-button type="primary">推送任务</el-button>
            <el-button type="primary">增加子任务</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetTaskManage"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { taskManage } from 'api/operationManage'
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
        loading: true
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
<style lang="less">
.task-manage-container a, .subTaskName {
  color: #52a4de
}
.el-dropdown-menu {
  a { color: #52a4de; }
  .el-tag { cursor: default; }
}
</style>
