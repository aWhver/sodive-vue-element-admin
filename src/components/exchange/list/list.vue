<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetExchangeList">
      <div class="filter-item">
        <el-input placeholder="ID" v-model="listQuery.goodsId" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input placeholder="商品名" v-model="listQuery.goodsName" clearable></el-input>
      </div>
      <div style="display: inline-block;float: right;">
        <el-button>上架</el-button>
        <el-button>下架</el-button>
        <router-link to="/exchange/addItems"><el-tag style="line-height: 38px;height: 40px;">新增商品</el-tag></router-link>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column width="50px">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isCheck"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="商品ID" prop="goodsId"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="品牌" prop="brand"></el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <span>&yen; {{ scope.row.price * 6 }} / $ {{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="编辑">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetExchangeList"></pagination>
    </el-footer>
  </div>
</template>
<script>
import { getExchangeList } from 'api/exchange'
export default {
  name: 'list',
  data () {
    return {
      list: null,
      total: 1,
      listQuery: {page: 1, goodsId: null, goodsName: null}
    }
  },
  created () { this.GetExchangeList() },
  methods: {
    GetExchangeList () {
      getExchangeList(this.listQuery).then(response => {
        this.total = response.data.total
        this.list = response.data.exchangeList.map(item => {
          this.$set(item, 'isCheck', false)
          return item
        })
      })
    },
    acceptQuery (query) {
      this.listQuery = query.listQuery
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = ['上架', '下架']
      return statusMap[status]
    },
    statusTagFilter (status) {
      const tagMap = ['success', 'info']
      return tagMap[status]
    }
  }
}
</script>
<style lang="less">

</style>
