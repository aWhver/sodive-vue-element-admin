<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetDetailList">
      <div class="filter-item">
        <el-select v-model="listQuery.shareChannel" style="width: 120px;" placeholder="分享渠道" clearable>
          <el-option v-for="item in shareChannelMap" :key="item.key" :value="item.key" :label="item.channel"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <el-input v-model="listQuery.coachId" placeholder="分享人ID" style="width: 120px;" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="dateRange"></el-date-picker>
      </div>
      <template slot="excel">
        <div class="filter-item">
          <el-input v-model="tableList" placeholder="输入excel名字,默认share-list" clearable></el-input>
        </div>
        <div class="filter-item">
          <el-button type="primary" :loading="downloadLoading" @click="excelExport" icon="el-icon-download">Excel</el-button>
        </div>
      </template>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="分享人ID" prop="coachId"></el-table-column>
        <el-table-column label="昵称" prop="nickName"></el-table-column>
        <el-table-column label="分享类型" prop="shareType"></el-table-column>
        <el-table-column label="累计分享次数" prop="shareNum"></el-table-column>
        <el-table-column label="累计浏览次数" prop="browseNum"></el-table-column>
        <el-table-column label="分享渠道">
          <template slot-scope="scope">
            <span>{{ scope.row.shareChannel | channelFilter }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetDetailList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getDetailList } from 'api/operationManage'
  const channelMap = {
    facebook: 'facebook',
    twitter: 'twitter',
    wechatMoments: '微信朋友圈',
    wechat: '微信'
  }
  export default {
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, shareChannel: null, coachId: null},
        dateRange: [],
        loading: true,
        shareChannelMap: [
          {key: 'facebook', channel: 'facebook'},
          {key: 'twitter', channel: 'twitter'},
          {key: 'wechatMoments', channel: '微信朋友圈'},
          {key: 'wechat', channel: '微信'}
        ],
        downloadLoading: false,
        tableList: ''
      }
    },
    created () { this.GetDetailList() },
    methods: {
      GetDetailList () {
        this.loading = true
        getDetailList(this.listQuery, this.dateRange).then(response => {
          this.list = response.data.detailList
          this.total = response.data.total
          this.loading = false
        })
      },
      excelExport () {
        this.downloadLoading = false
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['分享人ID', '昵称', '分享类型', '累计分享次数', '累计浏览次数', '分享渠道']
          const filterVal = ['coachId', 'nickName', 'shareType', 'shareNum', 'browseNum', 'shareChannel']
          const data = this.formatJson(filterVal, this.list)
          if (this.tableList === '') this.tableList = 'share-list'
          excel.export_json_to_excel(tHeader, data, this.tableList)
          this.downloadLoading = false
        })
      },
      formatJson (filterVal, dataJson) {
        return dataJson.map(v => filterVal.map(j => {
          if (j === 'shareChannel') {
            return channelMap[v[j]]
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
      channelFilter (channel) {
        return channelMap[channel]
      }
    }
  }
</script>
<style>


</style>
