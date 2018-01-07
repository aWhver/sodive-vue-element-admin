<template>
  <div>
    <el-header>
      <div class="filter-container" style="height: 60px">
        <div class="filter-item" style="margin-top: 10px">
          <el-select v-model="listQuery.timeCircle" clearable style="width: 130px;" @change="GetStatisticsList">
            <el-option v-for="item in timeCircleMap" :key="item.key" :value="item.key" :label="item.time"></el-option>
          </el-select>
        </div>
      </div>
    </el-header>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="分享内容" prop="shareContent"></el-table-column>
        <el-table-column label="facebook" prop="facebook"></el-table-column>
        <el-table-column label="微信朋友圈" prop="wechatMoments"></el-table-column>
        <el-table-column label="微信" prop="wechat"></el-table-column>
        <el-table-column label="twitter" prop="twitter"></el-table-column>
        <el-table-column label="总分享次数">
          <template slot-scope="scope">
            <span>{{ scope.row.facebook + scope.row.wechatMoments + scope.row.wechat + scope.row.twitter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总浏览次数" prop="browseNum"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetStatisticsList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getStatisticsList } from 'api/operationManage'
  export default {
    name: 'statistics',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, timeCircle: null},
        loading: true,
        timeCircleMap: [
          {key: 'week', time: '最近一周'},
          {key: 'month', time: '最近一个月'},
          {key: 'quarterYear', time: '最近3个月'},
          {key: 'halfYear', time: '最近半年'},
          {key: 'year', time: '最近一年'}
        ]
      }
    },
    created () { this.GetStatisticsList() },
    methods: {
      GetStatisticsList () {
        this.loading = true
        getStatisticsList(this.listQuery).then(response => {
          this.list = response.data.statisticsList
          this.total = response.data.total
          this.loading = false
        })
      }
    }
  }
</script>
<style>


</style>
