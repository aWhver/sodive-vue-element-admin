<template>
  <div>
    <el-container>
      <multiplicationFilter v-on:sendListQuery="acceptQuery" :searchBtn="searchBtn">
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
        </div>
        <div class="filter-item">
          <el-button type="primary" icon="el-icon-download" :loading="downloadLoading" @click="excelExport">Excel</el-button>
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
          <el-table-column label="序号" align="center" prop="id"></el-table-column>
          <el-table-column label="教练ID" align="center" prop="userId"></el-table-column>
          <el-table-column label="昵称" align="center" prop="nickName"></el-table-column>
          <el-table-column label="地区" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.countryName | countryFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column label="积分"  align="center" prop="point"></el-table-column>
          <el-table-column label="注册时间" min-width="120px" align="center" prop="registerTime"></el-table-column>
          <el-table-column label="证书"align="center" prop="certificate"></el-table-column>
          <el-table-column label="绑定用户" align="center" prop="bindUser"></el-table-column>
          <el-table-column label="合伙人" align="center" prop="agent"></el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.status === 0">
                正常
              </el-tag>
              <el-tag type="danger" v-if="scope.row.status === 1">
                注销
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="190px">
            <template slot-scope="scope">
              <template v-if="scope.row.status === 0 && scope.row.certificate !== '未上传'">
                <el-button type="info" @click="showDialog(scope.row)">注销</el-button>
                <el-button type="success" icon="el-icon-picture" @click="browseCertificate(scope.row)">查看证书</el-button>
              </template>
              <template v-else-if="scope.row.status === 1 && scope.row.certificate !== '未上传'">
                <el-button type="primary" @click="showDialog(scope.row)">恢复</el-button>
                <el-button type="success" icon="el-icon-picture" @click="browseCertificate(scope.row)">查看证书</el-button>
              </template>
              <template v-else-if="scope.row.status === 1">
                <el-button type="primary" @click="showDialog(scope.row)">恢复</el-button>
              </template>
              <template v-else>
                <el-button type="info" @click="showDialog(scope.row)">注销</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <pagination  :listQuery="listQuery" :total="total" :GetList="GetCoachList"></pagination>
      </el-footer>
    </el-container>
    <!-- 教练注销与恢复弹窗 -->
    <el-dialog :title="selectedInfo.isLogOff ? '注销教练' : '恢复教练'" :visible.sync="visible" width="350px" center>
      <div class="input-item" style="text-align: center;">
        <h3 v-if="selectedInfo.isLogOff">确定要注销教练(ID: {{ selectedInfo.coachId }})?</h3>
        <h3 v-else>确定要恢复教练(ID: {{ selectedInfo.coachId }})?</h3>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button @click="logOffReback()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <photo-swipe :imageList="imageList"></photo-swipe>
  </div>
</template>
<script>
  import { getCoachList } from 'api/userManage'
  import multiplicationFilter from 'views/multiplicationFilter/multiplicationFilter'
  let countryObj = {}
  export default {
    name: 'coach',
    data () {
      return {
        total: 1,
        list: null,
        loading: true,
        visible: false,
        listQuery: {page: 1},
        countryMap: [],
        selectedInfo: {
          isLogOff: null,
          coachId: null
        },
        promptMap: ['恢复教练成功', '注销教练成功'],
        imageList: [],
        downloadLoading: false
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
      showDialog (row) {
        this.selectedInfo.isLogOff = row.status ? 0 : 1
        this.selectedInfo.coachId = row.userId
        this.visible = true
      },
      logOffReback () {
        for (const i of this.list) {
          if (i.userId === this.selectedInfo.coachId) {
            if (i.status === 0) {
              i.status = 1
            } else {
              i.status = 0
            }
            this.$notify({type: 'success', message: this.promptMap[i.status], title: 'Prompt', duration: 2000})
            this.visible = false
            break
          }
        }
      },
      browseCertificate (row) {
        this.imageList = row.image
      },
      searchBtn () {
        this.listQuery.page = 1
        this.GetCoachList()
      },
      excelExport () {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['教练ID', '昵称', '地区', '积分', '注册时间', '证书', '绑定用户', '合伙人', '状态']
          const filterVal = ['userId', 'nickName', 'countryName', 'point', 'registerTime', 'certificate', 'bindUser', 'agent', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'coach-list')
          this.downloadLoading = false
        })
      },
      formatJson (filterVal, jsonData) {
        const statusMap = ['正常', '注销']
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'countryName') {
            return countryObj[v[j]]
          } else if (j === 'status') {
            return statusMap[v[j]]
          } else {
            return v[j]
          }
        }))
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
    components: { multiplicationFilter }
  }
</script>
<style lang="less">

</style>
