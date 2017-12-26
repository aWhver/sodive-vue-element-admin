<template>
  <div>
    <el-container>
      <multiplicationFilter v-on:sendListQuery="acceptQuery" :searchBtn="searchBtn">
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
        </div>
      </multiplicationFilter>
      <el-main>
        <el-table border :data="list" style="width:100%" v-loading="loading" element-loading-text="小主,我需要时间...">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="expand-table">
                <el-form-item>
                  <img :src="props.row.coachAvatar" alt="">
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.sex }}</span>
                </el-form-item>
                <el-form-item label="手机">
                  <span>{{ props.row.phoneNo }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="序号" width="50px" align="center" prop="id"></el-table-column>
          <el-table-column label="教练ID" width="90px" align="center" prop="coachId"></el-table-column>
          <el-table-column label="昵称" width="150px" align="center" prop="nickName"></el-table-column>
          <el-table-column label="地区" width="100px" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.countryName | countryFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="80px" align="center" prop="point"></el-table-column>
          <el-table-column label="注册时间" min-width="120px" align="center" prop="registerTime"></el-table-column>
          <el-table-column label="证书" width="120px" align="center" prop="certificate"></el-table-column>
          <el-table-column label="绑定用户" width="90px" align="center" prop="bindUser"></el-table-column>
          <el-table-column label="合伙人" width="150px" align="center" prop="agent"></el-table-column>
          <el-table-column label="状态" width="70px" align="center">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">
                正常
              </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 1">
                注销
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170px">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 0 && scope.row.certificate !== '未上传'">
                <el-button type="info">注销</el-button>
                <el-button type="success">查看证书</el-button>
              </template>
              <template v-else-if="scope.row.status === 1 && scope.row.certificate !== '未上传'">
                <el-button type="primary">恢复</el-button>
                <el-button type="success">查看证书</el-button>
              </template>
              <template v-else-if="scope.row.status === 1">
                <el-button type="primary">恢复</el-button>
              </template>
              <template v-else>
                <el-button type="info">注销</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <pagination  :currentPage="listQuery.page" :total="total" :handleSizeChange="handleSizeChange" :handleCurrentChange="handleCurrentChange"></pagination>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import { getCoachList } from 'api/userManage'
  import multiplicationFilter from 'views/multiplicationFilter/multiplicationFilter'
  import pagination from 'views/pagination/pagination'
  let countryObj = {}
  export default {
    name: 'coach',
    data () {
      return {
        total: 1,
        list: null,
        loading: true,
        listQuery: {page: 1},
        countryMap: []
      }
    },
    created () {
      this.GetCoachList()
    },
    methods: {
      GetCoachList () {
        this.loading = true
        getCoachList(this.listQuery).then(response => {
          this.list = response.data.coachList
          this.total = response.data.total
          this.loading = false
        })
      },
      searchBtn () {
        this.listQuery.page = 1
        this.GetCoachList()
      },
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.GetCoachList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.GetCoachList()
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
        this.countryMap = query.countryMap
        countryObj = query.countryMap.reduce((obj, item) => {
          obj[item.key] = item.name
          return obj
        }, {})
      }
    },
    filters: {
      countryFilter (val) {
        return countryObj[val]
      }
    },
    components: { multiplicationFilter, pagination }
  }
</script>
<style lang="less">

</style>
