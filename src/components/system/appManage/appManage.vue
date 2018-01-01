<template>
  <div>
    <el-header>
      <div class="filter-item" style="text-align: right">
        <el-button type="primary" icon="el-icon-plus" @click="visible = true">新增</el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="系统类型">
          <template slot-scope="scope">
            <span>{{ scope.row.systemType | systemTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="系统名称" prop="systemName"></el-table-column>
        <el-table-column label='应用类型'>
          <template slot-scope="scope">
            <span>{{ scope.row.applicationType | applicationTypeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="版本号" prop="version"></el-table-column>
        <el-table-column label="强制更新">
          <template slot-scope="scope">
            <span>{{ scope.row.forceUpdate | forceUpdateFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下载地址" prop="downloadURL" min-width="300" align="left"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"><i class="el-icon-edit"></i>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetVersionList"></pagination>
    </el-footer>
    <el-dialog title="新增/编辑" :visible.sync="visible" class="versionDialog">
      <el-form :model="versionForm" inline>
        <el-form-item label="系统类型" prop="systemType">
          <el-radio-group v-model="versionForm.systemType">
            <el-radio label="1">用户版</el-radio>
            <el-radio label="0">教练版版</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="应用类型" prop="applicationType">
          <el-radio-group v-model="versionForm.applicationType">
            <el-radio label="0">Android</el-radio>
            <el-radio label="1">IOS</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="下载地址" prop="download">
          <el-input v-model="versionForm.download"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" prop="systemName">
          <el-input v-model="versionForm.systemName"></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="versionForm.version"></el-input>
        </el-form-item>
        <el-form-item label="强制更新" prop="forceUpdate">
          <el-radio-group v-model="versionForm.forceUpdate">
            <el-radio label="0">不强制</el-radio>
            <el-radio label="1">强制</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getVersionList } from 'api/system'
  export default {
    name: 'appManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1},
        visible: false,
        versionForm: {
          systemType: '',
          applicationType: '',
          download: '',
          systemName: '',
          version: '',
          forceUpdate: ''
        }
      }
    },
    created () { this.GetVersionList() },
    methods: {
      GetVersionList () {
        getVersionList(this.listQuery).then(response => {
          this.list = response.data.versionList
          this.total = response.data.total
        })
      }
    },
    filters: {
      systemTypeFilter (val) {
        const systemTypeMap = ['教练版', '用户版']
        return systemTypeMap[val]
      },
      applicationTypeFilter (val) {
        const applicationTypeMap = ['Android', 'IOS']
        return applicationTypeMap[val]
      },
      forceUpdateFilter (val) {
        const forceUpdateMap = ['不强制', '强制']
        return forceUpdateMap[val]
      }
    }
  }
</script>
<style lang="less">
.versionDialog {
  .el-dialog__footer {
    text-align: center;
  }
  .el-form{
    width: 300px;
  }
}
</style>
