<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetCertificateList">
      <div class="filter-item">
        <el-input style="width: 100px" v-model="listQuery.userId" placeholder="ID" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 120px" v-model="listQuery.name" placeholder="姓名" clearable></el-input>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="pending.certificateList" v-loading="loading" element-loading-text="小主,我需要时间..." border style="text-align: center">
        <el-table-column label="序号" prop="id" width="60px"></el-table-column>
        <el-table-column label="ID" prop="userId"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="用户类型" prop="userType"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="认证机构" prop="institution"></el-table-column>
        <el-table-column label="发证时间" prop="getCertificateTime"></el-table-column>
        <el-table-column label="提交时间" prop="submitCertificateTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" label="操作">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 0">
              <el-button type="success" size="mini" @click="pass(scope.row)">通过</el-button>
              <el-button type="danger" size="mini" @click="noPass(scope.row)">不通过</el-button>
              <el-button type="primary" size="mini" @click="checkPic" icon="el-icon-picture">查看</el-button>
            </template>
            <template v-else-if="scope.row.status === 1">
              <el-button type="primary" size="mini" @click="checkPic" icon="el-icon-picture">查看</el-button>
            </template>
            <template v-else>
              <el-button type="success" size="mini" @click="pass(scope.row)">通过</el-button>
              <el-button type="primary" size="mini" @click="checkPic" icon="el-icon-picture">查看</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="pending.total" :listQuery="listQuery" :GetList="GetCertificateList"></pagination>
    </el-footer>
    <el-dialog title="将此证书标记为不通过" :visible.sync="visible">
      <div>
        <el-input v-model="reason" placeholder="请输入不通过理由"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="sureNoPass()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getCoachCertificateList } from 'api/userManage'
  export default {
    name: 'certificatePending',
    props: {
      type: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        pending: {certificateList: null, total: 1},
        loading: true,
        listQuery: {
          page: 1,
          limit: 10,
          type: this.type, // 用以区分搜索证件状态
          userId: null,
          name: null
        },
        visible: false,
        selectedUserId: '',
        reason: ''
      }
    },
    created () {
      this.GetCertificateList()
    },
    methods: {
      GetCertificateList () {
        this.loading = true
        getCoachCertificateList(this.listQuery).then(response => {
          this.pending = response.data
          this.loading = false
        })
      },
      checkPic () {
        console.log(1)
      },
      pass (row) {
        for (const i of this.pending.certificateList) {
          if (i.userId === row.userId) {
            const index = this.pending.certificateList.indexOf(i)
            this.pending.certificateList[index]['status'] = 1
            break
          }
        }
        this.$notify({
          type: 'success',
          title: '审核通过',
          message: '已将该证书标记为合格证书',
          duration: 1500
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
        for (const i of this.pending.certificateList) {
          if (i.userId === this.selectedUserId) {
            const index = this.pending.certificateList.indexOf(i)
            this.pending.certificateList[index]['status'] = 2
            break
          }
        }
        this.visible = false
        this.reason = ''
        this.$notify({
          type: 'success',
          title: '审核不通过',
          message: '已将该证书标记为不合格证书',
          duration: 1500
        })
      },
      acceptQuery (query) {
        // this.listQuery = Object.assign(this.listQuery, query.listQuery)
        // this.listQuery = { ...this.listQuery, ...query.listQuery }
        this.listQuery = query.listQuery
        this.listQuery.type = this.type
      }
    },
    filters: {
      statusFilter (val) {
        const status = ['待审核', '已审核', '审核失败']
        return status[val]
      },
      statusTagFilter (val) {
        const status = ['info', 'success', 'danger']
        return status[val]
      }
    }
  }
</script>
<style lang="less">

</style>
