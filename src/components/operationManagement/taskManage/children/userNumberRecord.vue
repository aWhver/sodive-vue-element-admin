<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="fetchUserNumberRecord">
      <div class="filter-item">
        <el-button type="primary" @click="goBack" size="medium"><svg-icon :iconClass="'back'"></svg-icon>任务[{{ taskName }}]&nbsp;&nbsp;用户参与记录</el-button>
      </div>
      <div class="filter-item">
        <el-input v-model="listQuery.userId" placeholder="用户ID" clearable></el-input>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="任务名称" prop="taskName" width="300px"></el-table-column>
        <el-table-column label="用户ID" prop="userId" width="120px"></el-table-column>
        <el-table-column label="用户昵称" prop="nickName" width="140px"></el-table-column>
        <el-table-column label="提交时间" prop="submitTime" width="240px"></el-table-column>
        <el-table-column label="拒绝原因" align="left">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'failed'">{{ scope.row.refuseReason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" width="120px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="fetchUserNumberRecord"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { userNumberRecord } from 'api/operationManage'
  export default {
    data () {
      return {
        list: null,
        total: 1,
        taskName: '',
        listQuery: {page: 1, taskId: this.$route.params.taskId, userId: null},
        loading: true
      }
    },
    created () { this.fetchUserNumberRecord() },
    methods: {
      fetchUserNumberRecord () {
        userNumberRecord(this.listQuery).then(response => {
          this.list = response.data.recordList
          this.total = response.data.total
          this.taskName = response.data.taskName
        })
      },
      goBack () { this.$router.go(-1) },
      acceptQuery (query) {
        this.listQuery = query.listQuery
        this.listQuery.taskId = this.$route.params.taskId
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = {'pending': '待审核', 'pended': '审核通过', 'failed': '审核失败'}
        return statusMap[status]
      },
      statusTagFilter (status) {
        const statusMap = {'pending': 'primary', 'pended': 'success', 'failed': 'danger'}
        return statusMap[status]
      }
    }
  }
</script>
<style lang="less">

</style>
