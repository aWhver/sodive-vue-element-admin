<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetCertificateList"></certificate-filter>
    <el-main>
      <el-table :data="pended.list" border style="text-align: center">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="ID" prop="userId"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="用户类型" prop="userType"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="认证机构" prop="institution"></el-table-column>
        <el-table-column label="发证时间" prop="getCertificateTime"></el-table-column>
        <el-table-column label="提交时间" prop="submitCertificateTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.status | statusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button type="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="pended.total" :listQuery="listQuery" :GetList="GetCertificateList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getCoachCertificateList } from 'api/userManage'
  import certificateFilter from 'views/multiplicationFilter/certificateFilter'
  export default {
    name: 'certificatePended',
    data () {
      return {
        pended: {list: null, total: 1},
        listQuery: {
          page: 1,
          limit: 10,
          type: null // 用以区分搜索证件状态
        }
      }
    },
    created () { this.GetCertificateList() },
    methods: {
      GetCertificateList () {
        getCoachCertificateList(this.listQuery).then(response => {
          this.pended = response.data.pended
        })
      },
      /* handleClick (tab) {
       this.listQuery.type = tab.index
       }, */
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      statusFilter (val) {
        const status = ['待审核', '已审核', '审核失败']
        return status[val]
      }
    },
    components: { certificateFilter }
  }
</script>
<style lang="less">

</style>
