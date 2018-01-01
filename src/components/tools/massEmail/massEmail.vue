<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane name="emailTemplate" label="邮件模板">
        <el-main>
          <el-table :data="templateList" border v-loading="loading" element-loading-text="小主,我需要时间...">
            <el-table-column label="邮件标题" align="left" prop="title"></el-table-column>
            <el-table-column label="语言" align="center" prop="language"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <router-link :to="`editTemplate/${scope.row.id}`">
                  <el-button type="primary">
                    <i class="el-icon-edit"></i>编辑
                  </el-button>
                </router-link>
                <el-button @click="deleteTemplate(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <pagination :total="templateTotal" :listQuery="listQuery" :GetList="GetEmailList"></pagination>
        </el-footer>
      </el-tab-pane>
      <el-tab-pane name="emailList" label="群发邮件列表">
        <el-table :data="emailList" border v-loading="loading" element-loading-text="小主,我需要时间...">
          <el-table-column label="标题" prop="title" min-width="150"></el-table-column>
          <el-table-column label="语言" prop="language" align="center" width="80"></el-table-column>
          <el-table-column label="发送对象" prop="sendNum" align="center" width="100"></el-table-column>
          <el-table-column label="发送时间" prop="sendTime" align="center" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { getMassiveList } from 'api/massiveEmail'
  export default {
    name: 'massEmail',
    data () {
      return {
        activeName: 'emailTemplate',
        emailList: null,
        templateList: null,
        emailTotal: 1,
        templateTotal: 1,
        listQuery: { page: 1 },
        loading: true
      }
    },
    created () { this.GetEmailList() },
    methods: {
      GetEmailList () {
        this.loading = true
        getMassiveList(this.listQuery).then(response => {
          this.templateList = response.data.templateList
          this.emailList = response.data.emailList
          this.templateTotal = response.data.totalMap[0]
          this.emailTotal = response.data.totalMap[1]
          this.loading = false
        })
      },
      deleteTemplate (row) {
        for (let [i, item] of this.templateList.entries()) {
          if (item.id === row.id) {
            this.templateList.splice(i, 1)
          }
        }
      }
    }
  }
</script>
<style lang="less">

</style>
