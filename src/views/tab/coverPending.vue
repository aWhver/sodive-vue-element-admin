<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetCoverList">
      <div class="filter-item">
        <el-input v-model="listQuery.userId" placeholder="发布者ID" clearable></el-input>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="序号" prop="id"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="">
          </template>
        </el-table-column>
        <el-table-column label="位置信息" prop="position"></el-table-column>
        <el-table-column label="发布者ID" prop="userId"></el-table-column>
        <el-table-column label="上传时间" prop="uploadTime"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusTagFilter">{{ scope.row.status | statusFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 1">
              <el-button type="success" @click="pass(scope.row)">通过</el-button>
              <el-button type="danger" @click="noPass(scope.row)">不通过</el-button>
              <el-button type="warning" @click="deleteCover(scope.row)">删除</el-button>
            </template>
            <template v-else>
              <el-button type="primary" @click="review(scope.row)">重新审核</el-button>
              <el-button type="warning" @click="deleteCover(scope.row)">删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetCoverList"></pagination>
    </el-footer>
  </div>
</template>
<script>
  import { getCoverList } from 'api/contentManagement'
  export default {
    name: 'coverPending',
    props: {
      type: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        activeName: 'pending',
        list: null,
        total: 1,
        listQuery: {page: 1, type: this.type, userId: null}
      }
    },
    created () { this.GetCoverList() },
    methods: {
      GetCoverList () {
        getCoverList(this.listQuery).then(response => {
          this.list = response.data.coverList
          this.total = response.data.total
        })
      },
      review (row) {
        for (const [i, v] of this.list.entries()) {
          if (v.userId === row.userId) {
            this.list[i].status = 1
            break
          }
        }
        this.$notify({
          title: 'Prompt',
          message: '成功将此条发现修改为重新审核',
          type: 'info',
          duration: 2000
        })
      },
      pass (row) {
        for (const [i, v] of this.list.entries()) {
          if (v.userId === row.userId) {
            this.list[i].status = 2
            break
          }
        }
        this.$notify({
          title: 'Prompt',
          message: '成功将此条发现通过审核',
          type: 'info',
          duration: 2000
        })
      },
      noPass (row) {
        for (const [i, v] of this.list.entries()) {
          if (v.userId === row.userId) {
            this.list[i].status = 0
            break
          }
        }
        this.$notify({
          title: 'Prompt',
          message: '成功将此条发现设为不通过',
          type: 'info',
          duration: 2000
        })
      },
      deleteCover (row) {
        for (const [i, v] of this.list.entries()) {
          if (v.userId === row.userId) {
            this.list.splice(i, 1)
            break
          }
        }
        this.$notify({
          title: 'Prompt',
          message: '成功将此条发现删除',
          type: 'info',
          duration: 2000
        })
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
        this.listQuery.type = this.type
      }
    },
    filters: {
      statusFilter (val) {
        const status = ['审核失败', '待审核', '通过']
        return status[val]
      },
      statusTagFilter (val) {
        const status = ['danger', 'primary', 'success']
        return status[val]
      }
    }
  }
</script>
<style lang="less">

</style>
