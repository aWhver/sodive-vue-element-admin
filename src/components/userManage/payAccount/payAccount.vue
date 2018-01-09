<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetPayAccountList">
      <div class="filter-item">
        <el-input style="width: 100px" v-model="listQuery.userId" placeholder="ID" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 120px" v-model="listQuery.name" placeholder="姓名" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-select v-model="listQuery.payType" placeholder="支付类型" clearable style="width:120px">
          <el-option v-for="item in payTypeMap" :key="item.payType" :value="item.payType" :label="item.name"></el-option>
        </el-select>
      </div>
      <template slot="excel">
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-download" :loading="downloadLoading" @click="excelExport">Excel</el-button>
        </div>
      </template>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
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
        listQuery: {page: 1, payType: null, userId: null, name: null},
        payTypeMap: payTypeMap,
        statusMap: ['该用户支付账号已恢复正常', '已成功注销该账户'],
        loading: true,
        downloadLoading: false
      }
    },
    created () {
      this.GetPayAccountList()
    },
    methods: {
      GetPayAccountList () {
        this.loading = true
        getPayAccountList(this.listQuery).then(response => {
          this.list = response.data.payAccountList.map(item => {
            this.$set(item, 'statusSwitch', !item.status)
            return item
          })
          this.total = response.data.total
          this.loading = false
        })
      },
      changeStatus (row) {
        row.status = row.statusSwitch ? 0 : 1
        this.$notify({
          message: this.statusMap[row.status],
          title: '操作成功',
          type: 'success',
          duration: 2000
        })
      },
      excelExport () {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['ID', '用户类型', '支付类型', '账号', '姓名', '创建时间', '修改时间', '状态']
          const filterVal = ['userId', 'userType', 'payType', 'account', 'name', 'createTime', 'modifyTime', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'payAccount-list')
          this.downloadLoading = false
        })
      },
      formatJson (filterVal, jsonData) {
        const statusMap = ['正常', '失效']
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'payType') {
            return payTypeObj[v[j]]
          } else if (j === 'status') {
            return statusMap[v[j]]
          } else {
            return v[j]
          }
        }))
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
    }
  }
</script>
<style lang="less">

</style>
