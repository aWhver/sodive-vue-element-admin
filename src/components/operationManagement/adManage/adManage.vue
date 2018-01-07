<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetBannerList">
      <div class="filter-item">
        <el-input v-model="listQuery.title" placeholder="标题" clearable></el-input>
      </div>
      <div class="filter-item fr">
        <el-button type="primary">新增</el-button>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="标题" prop="title" align="left" width="300px"></el-table-column>
        <el-table-column label="banner图">
          <template slot-scope="scope">
            <img :src="scope.row.banner" width="100" height="65" alt="">
          </template>
        </el-table-column>
        <el-table-column label="url" prop="url" align="left" min-width="260px"></el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="是否有效" width="150px">
          <template slot-scope="scope">
            <el-button :type="scope.row.effective | effectiveTagFilter" @click="changeStatus(scope.row)">{{ scope.row.effective | effectiveFilter }}</el-button>
            <el-button type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetBannerList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getBannerList } from 'api/operationManage'
  export default {
    name: 'adManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, title: null},
        loading: true
      }
    },
    created () { this.GetBannerList() },
    methods: {
      GetBannerList () {
        this.loading = true
        getBannerList(this.listQuery).then(response => {
          this.list = response.data.bannerList
          this.total = response.data.total
          this.loading = false
        })
      },
      changeStatus (row) {
        row.effective = row.effective === 'effective' ? 'ineffective' : 'effective'
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      typeFilter (type) {
        const typeObj = {user: '用户端', pro: '教练端'}
        return typeObj[type]
      },
      effectiveFilter (effective) {
        const effectiveObj = {effective: '有效', ineffective: '无效'}
        return effectiveObj[effective]
      },
      effectiveTagFilter (effective) {
        const effectiveTagObj = {effective: 'success', ineffective: 'danger'}
        return effectiveTagObj[effective]
      }
    }
  }
</script>
<style lang="less">

</style>
