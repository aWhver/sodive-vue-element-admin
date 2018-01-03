<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetTaskList">
      <div class="filter-item">
        <el-input v-model="listQuery.userId" placeholder="用户ID" clearable></el-input>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" v-loading="loading" element-loading-text="小主,我需要时间..." style="text-align: center" border>
        <el-table-column label="任务名称" prop="taskName"></el-table-column>
        <el-table-column label="用户ID" prop="userId"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="提交时间" prop="submitTime"></el-table-column>
        <el-table-column label="拒绝理由" v-if="type === 'failed'" min-width="240" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.refuseReason }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | taskTagFilter">{{ scope.row.status | taskStatusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 'pending'">
              <el-button type="success" size="mini" @click="pass(scope.row)">通过</el-button>
              <el-button type="danger" size="mini" @click="noPass(scope.row)">不通过</el-button>
              <el-button type="primary" size="mini" @click="checkDetail(scope.row)" icon="el-icon-picture">查看</el-button>
            </template>
            <template v-else-if="scope.row.status === 'pended'">
              <el-button type="primary" size="mini" @click="checkDetail(scope.row)" icon="el-icon-picture">查看</el-button>
            </template>
            <template v-else>
              <el-button type="success" size="mini" @click="pass(scope.row)">通过</el-button>
              <el-button type="primary" size="mini" @click="checkDetail(scope.row)" icon="el-icon-picture">查看</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetTaskList"></pagination>
    </el-footer>
    <el-dialog title="将此用户任务标记为不通过" :visible.sync="visible">
      <div>
        <el-input v-model="reason" placeholder="请输入不通过理由"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="sureNoPass()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看任务详情" align="center" :visible.sync="visibleDetail" class="taskDetail">
        <div class="subInfo">
          <p><span>用户ID：</span><span>{{detail.userId}}</span></p>
          <p><span>用户昵称：</span><span>{{detail.nickName}}</span></p>
          <p><span>提交时间：</span><span>{{detail.submitTime}}</span></p>
        </div>
        <div class="task">
          <ul>
            <li v-for="(item, index) in detail.taskContent">
              <strong>任务{{ index + 1 }}</strong>
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getTaskList } from 'api/operationManage'
  const taskStatusMap = [
    {status: 'pending', label: '待审核'},
    {status: 'pended', label: '审核通过'},
    {status: 'failed', label: '审核失败'}
  ]
  const taskStatusObj = taskStatusMap.reduce((obj, item) => {
    obj[item.status] = item.label
    return obj
  }, {})
  export default {
    props: {
      type: {
        type: String,
        required: true,
        default: 'pending'
      }
    },
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, type: this.type, userId: null},
        loading: true,
        visible: false,
        selectedUserId: '',
        reason: '',
        visibleDetail: false,
        detail: {
          nickName: '',
          userId: undefined,
          submitTime: '',
          taskContent: null
        }
      }
    },
    created () { this.GetTaskList() },
    methods: {
      GetTaskList () {
        this.loading = true
        getTaskList(this.listQuery).then(response => {
          this.list = response.data.taskList.map(item => {
            this.$set(item, 'isCheck', false)
            return item
          })
          this.total = response.data.total
          this.loading = false
        })
      },
      pass (row) {
        for (const i of this.list) {
          if (i.userId === row.userId) {
            const index = this.list.indexOf(i)
            this.list[index]['status'] = 'pended'
            break
          }
        }
        this.$notify({
          type: 'success',
          title: '审核通过',
          message: '已将该用户所做任务为通过',
          duration: 2000
        })
      },
      noPass (row) {
        this.visible = true
        this.selectedUserId = row.userId
      },
      sureNoPass () {
        if (this.reason === '') {
          this.$message({
            message: '请输入不通过理由',
            type: 'warning'
          })
          return false
        }
        for (const i of this.list) {
          if (i.userId === this.selectedUserId) {
            const index = this.list.indexOf(i)
            this.list[index]['status'] = 'failed'
            break
          }
        }
        this.visible = false
        this.reason = ''
        this.$notify({
          type: 'success',
          title: '审核不通过',
          message: '已将该用户任务标记为不通过',
          duration: 2000
        })
      },
      checkDetail (row) {
        this.visibleDetail = true
        this.detail = {
          nickName: row.nickName,
          userId: row.userId,
          submitTime: row.submitTime,
          taskContent: row.taskContent
        }
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
        this.listQuery.type = this.type
      }
    },
    filters: {
      taskStatusFilter (status) {
        return taskStatusObj[status]
      },
      taskTagFilter (status) {
        const tagStatusObj = {
          'pending': 'primary',
          'pended': 'success',
          'failed': 'danger'
        }
        return tagStatusObj[status]
      }
    }
  }
</script>
<style lang="less">
  .taskDetail {
    .subInfo p {
      display: inline-block;
      margin: 10px 3px;
      font-size: 16px;
      span:nth-of-type(2) {
        color: #000
      }
    }
    .task {
      li {margin: 5px 0;}
      text-align: left;
      strong {vertical-align: top}
      p {display: inline-block;margin: 0 0 0 10px;color: #000;width: 85%; word-wrap: break-word;}
    }
  }
</style>
