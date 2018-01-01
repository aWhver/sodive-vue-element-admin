<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetMessageList">
      <div class="filter-item">
        <el-select v-model="listQuery.pushType" placeholder="推送类型" style="width: 140px" clearable>
          <el-option v-for="item in pushTypeMap" :value="item.pushType" :label="item.label" :key="item.pushType"></el-option>
        </el-select>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" style="text-align: center" border v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="推送对象" prop="pushTarget"></el-table-column>
        <el-table-column label="推送地区" prop="pushRegion"></el-table-column>
        <el-table-column label="推送标题" min-width="180" align="left" prop="pushTitle"></el-table-column>
        <el-table-column label="推送类型">
          <template slot-scope="scope">
            <el-tag type="primary">{{ scope.row.pushType | pushTypeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="推送条数" width="100" prop="pushNum"></el-table-column>
        <el-table-column label="推送时间" prop="pushTime"></el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :listQuery="listQuery" :GetList="GetMessageList" :total="total"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getMessageList } from 'api/massiveEmail'
  const pushTypeMap = [
    {pushType: 'system', label: '系统消息'},
    {pushType: 'normal', label: '普通消息'},
    {pushType: 'sodive', label: 'sodive学院'},
    {pushType: 'task', label: '任务消息'},
    {pushType: 'production', label: '产品消息'}
  ]
  const pushTypeObj = pushTypeMap.reduce((obj, item) => {
    obj[item.pushType] = item.label
    return obj
  }, {})
  export default {
    name: 'messageNotification',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, pushType: undefined},
        pushTypeMap: pushTypeMap,
        loading: true
      }
    },
    created () { this.GetMessageList() },
    methods: {
      GetMessageList () {
        this.loading = true
        getMessageList(this.listQuery).then(response => {
          this.list = response.data.messageList
          this.total = response.data.total
          this.loading = false
        })
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      pushTypeFilter (pushType) {
        return pushTypeObj[pushType]
      }
    }
  }
</script>
<style lang="less">

</style>
