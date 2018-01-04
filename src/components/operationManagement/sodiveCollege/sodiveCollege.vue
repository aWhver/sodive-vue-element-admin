<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetSodiveList">
      <div class="filter-item">
        <el-select v-model="listQuery.status" clearable style="width: 150px">
          <el-option v-for="item in statusMap" :key="item.status" :value="item.status" :label="item.label"></el-option>
        </el-select>
      </div>
      <div class="filter-item fr">
        <router-link to="/operationManagement/sodiveCollege/sodive/14">
          <el-button type="primary">新增</el-button>
        </router-link>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="ID" prop="id" width="150px"></el-table-column>
        <el-table-column label="栏目">
          <template slot-scope="scope">
            <span>{{ scope.row.programa | programaFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title" min-width="200px" align="left"></el-table-column>
        <el-table-column label="是否置顶" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.top | topFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="状态" width="120px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布操作">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.published" @change="changeStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
           <router-link :to="`/operationManagement/sodiveCollege/sodive/${scope.row.id}`"><el-button type="primary">编辑</el-button></router-link>
           <el-button type="warning" @click="deleteItem(scope.row)">删除</el-button>
           <el-button type="success" @click="visible = true">推送</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :Getlist="GetSodiveList"></pagination>
    </el-footer>
    <el-dialog title="推送消息" :visible.sync="visible">
      <div>
        <el-radio-group v-model="type">
          <el-radio label="0">全部</el-radio>
          <el-radio label="1">中国</el-radio>
          <el-radio label="2">海外</el-radio>
        </el-radio-group>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="push" type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getSodiveList } from 'api/operationManage'
  const statusMap = [
    {status: 'published', label: '已发布'},
    {status: 'draft', label: '未发布'}
  ]

  const statusObj = statusMap.reduce((obj, item) => {
    obj[item.status] = item.label
    return obj
  }, {})
  export default {
    name: 'sodiveCollege',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, status: null},
        statusMap: statusMap,
        visible: false,
        type: ''
      }
    },
    created () { this.GetSodiveList() },
    methods: {
      GetSodiveList () {
        getSodiveList(this.listQuery).then(response => {
          this.list = response.data.sodiveList.map(item => {
            if (item.status === 'published') {
              this.$set(item, 'published', true)
            } else {
              this.$set(item, 'published', false)
            }
            return item
          })
          this.total = response.data.total
        })
      },
      changeStatus (row) {
        row.status = row.published ? 'published' : 'draft'
        this.$message.success('修改状态成功')
      },
      deleteItem (row) {
        for (const [i, item] of this.list.entries()) {
          if (item.id === row.id) {
            this.list.splice(i, 1)
          }
        }
      },
      push () {
        if (this.type === '') {
          this.$message.warning('请选择推送对象')
        } else {
          this.$message.success('推送成功')
          this.visible = false
        }
      },
      cancel () {
        this.visible = false
        this.type = ''
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      topFilter (top) {
        const topMap = {'yes': '是', 'no': '否'}
        return topMap[top]
      },
      programaFilter (programa) {
        const programaMap = {'sodive': 'sodive学院'}
        return programaMap[programa]
      },
      statusFilter (status) {
        return statusObj[status]
      },
      statusTagFilter (status) {
        const statusMap = {'published': 'success', 'draft': 'danger'}
        return statusMap[status]
      }
    }
  }
</script>
<style lang="less">

</style>
