<template>
  <div class="url-container">
    <el-main>
      <el-table :data="list" border style="text-align: center" class="el-table-medium">
        <el-table-column label="网址ID" prop="urlId" align="center" width="300"></el-table-column>
        <el-table-column label="网址主功能说明" min-width="230"  align="left">
          <template slot-scope="scope">
            <template v-if="scope.row.isEdit">
              <el-input v-model="scope.row.functionIntroduce"></el-input>
              <el-button class="cancel-button" type="warning" icon="el-icon-refresh" @click="cancelEdit(scope.row)">取消</el-button>
            </template>
            <span v-else>{{ scope.row.functionIntroduce }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用版本" width="220">
          <template slot-scope="scope">
            <template v-if="scope.row.isEdit">
              <el-radio-group v-model="scope.row.applicationVersion">
                <el-radio label="user">用户端</el-radio>
                <el-radio label="pro">教练端</el-radio>
              </el-radio-group>
            </template>
            <span v-else>{{ scope.row.applicationVersion | applicationVersionFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isEdit" type="success" icon="el-icon-circle-check-outline" @click="save(scope.row)">保存</el-button>
            <el-button v-else type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
            <router-link :to="`url/${scope.row.urlId}`">
              <el-button type="primary">网址</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
  import { getUrlList } from 'api/system'
  export default {
    name: 'urlManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1}
      }
    },
    created () { this.GetUrlList() },
    methods: {
      GetUrlList () {
        getUrlList(this.listQuery).then(response => {
          this.list = response.data.urlList.map(item => {
            this.$set(item, 'isEdit', false)
            item.originalfunctionIntroduce = item.functionIntroduce
            return item
          })
          this.total = response.data.total
        })
      },
      edit (row) {
        this.list.forEach(item => {
          if (item.urlId === row.urlId) {
            item.isEdit = true
          }
        })
      },
      cancelEdit (row) {
        row.functionIntroduce = row.originalfunctionIntroduce
        row.isEdit = false
        this.$message.info('您已取消编辑')
      },
      save (row) {
        row.isEdit = false
        row.originalfunctionIntroduce = row.functionIntroduce
        row.applicationType = row.applicationType
        this.$message.success('您已修改该网址信息')
      }
    },
    filters: {
      applicationVersionFilter (val) {
        const applicationVersionMap = {'user': '用户端', 'pro': '教练端'}
        return applicationVersionMap[val]
      }
    }
  }
</script>
<style lang="less">
.url-container {
  .el-table td .cell{
    position: relative;
    .el-input {
      padding-right: 70px;
      input {
        height: 32px;
      }
    }
    .cancel-button {
      position: absolute;
      top: 0px;
      right: 5px;
    }
  }
}
</style>
