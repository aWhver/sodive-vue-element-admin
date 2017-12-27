<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetPayAccountList">
      <div class="filter-item">
        <el-select v-model="listQuery.payType" placeholder="支付类型" clearable style="width:120px">
          <el-option v-for="item in payTypeMap" :key="item.payType" :value="item.payType" :label="item.name"></el-option>
        </el-select>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="ID" prop="userId"></el-table-column>
        <el-table-column label="用户类型" prop="userType"></el-table-column>
        <el-table-column label="支付类型">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.payType | payTypeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="修改时间" prop="modifyTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.statusSwitch" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetPayAccountList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getPayAccountList } from 'api/userManage'
  import certificateFilter from 'views/multiplicationFilter/certificateFilter'
  const payTypeMap = [
    {payType: 0, name: 'Alipay'},
    {payType: 1, name: 'Wechat'},
    {payType: 2, name: 'Paypal'}
  ]

  const payTypeObj = payTypeMap.reduce((obj, item) => {
    obj[item.payType] = item.name
    return obj
  }, {})
  export default {
    name: 'payAccount',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, payType: null},
        payTypeMap: payTypeMap
      }
    },
    created () {
      this.GetPayAccountList()
    },
    methods: {
      GetPayAccountList () {
        getPayAccountList(this.listQuery).then(response => {
          this.list = response.data.payAccountList.map(item => {
            this.$set(item, 'statusSwitch', !item.status)
            return item
          })
          this.total = response.data.total
        })
      },
      changeStatus (row) {
        row.status = row.statusSwitch ? 0 : 1
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      payTypeFilter (type) {
        return payTypeObj[type]
      },
      statusFilter (status) {
        const statusMap = ['正常', '失效']
        return statusMap[status]
      },
      statusTagFilter (status) {
        const tagMap = ['success', 'danger']
        return tagMap[status]
      }
    },
    components: { certificateFilter }
  }
</script>
<style lang="less">

</style>
