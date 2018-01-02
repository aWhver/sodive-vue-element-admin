<template>
  <div>
    <el-header>
      <div class="filter-item" style="text-align: right">
        <el-button type="primary" @click="handleCreate">新增<i class="el-icon-circle-plus"></i></el-button>
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
            <el-button type="primary" @click="editVersionInfo(scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetVersionList"></pagination>
    </el-footer>
    <el-dialog title="新增/编辑" :visible.sync="visible" class="versionDialog">
      <el-form :model="versionForm" ref="versionForm" :rules="versionRules" inline>
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
        <el-form-item label="下载地址" prop="downloadURL">
          <el-input v-model="versionForm.downloadURL" clearable style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="系统名称" prop="systemName">
          <el-input v-model="versionForm.systemName" clearable></el-input>
        </el-form-item>
        <el-form-item label="版本号" prop="version" style="display: block">
          <el-input v-model="versionForm.version" clearable></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="versionForm.createTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="强制更新" prop="forceUpdate">
          <el-radio-group v-model="versionForm.forceUpdate">
            <el-radio label="0">不强制</el-radio>
            <el-radio label="1">强制</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="isEdit" @click="cancelForm">取消</el-button>
        <el-button v-else @click="visible = false">取消</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getVersionList } from 'api/system'
  import { formatTime } from 'utils/index'
  export default {
    name: 'appManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1},
        visible: false,
        versionForm: {
          id: null,
          systemType: '',
          applicationType: '',
          downloadURL: '',
          systemName: '',
          version: '',
          forceUpdate: '',
          createTime: ''
        },
        versionRules: {
          systemType: [{required: true, trigger: 'blur', message: '请选择系统类型'}],
          applicationType: [{required: true, trigger: 'blur', message: '请选择应用类型'}],
          downloadURL: [{required: true, trigger: 'blur', message: '请填写下载地址'}],
          systemName: [{required: true, trigger: 'blur', message: '请填写系统名称'}],
          version: [{required: true, trigger: 'blur', message: '请填写版本号'}],
          forceUpdate: [{required: true, trigger: 'blur', message: '请选择是否强制更新'}]
        },
        isEdit: false
      }
    },
    created () { this.GetVersionList() },
    methods: {
      GetVersionList () {
        getVersionList(this.listQuery).then(response => {
          this.list = response.data.versionList
          this.total = response.data.total
        })
      },
      submitForm () {
        this.$refs.versionForm.validate(valid => {
          if (valid) {
            if (this.isEdit) {
              this.list.forEach((item, index) => {
                if (item.id === this.versionForm.id) {
                  this.versionForm.createTime = formatTime(this.versionForm.createTime)
                  this.list.splice(index, 1, this.versionForm)
                  this.$notify({
                    title: '修改成功',
                    message: '已修改版本信息',
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            } else {
              this.versionForm.createTime = formatTime(this.versionForm.createTime)
              this.list.unshift(this.versionForm)
              this.$notify({
                title: '提交成功',
                message: '成功提交版本信息',
                type: 'success',
                duration: 2000
              })
            }
            this.visible = false
            this.isEdit = false
          }
        })
      },
      handleCreate () {
        this.visible = true
        this.resetForm()
        this.$nextTick(() => {
          this.$refs.versionForm.clearValidate()
        })
      },
      resetForm () {
        this.versionForm = {
          id: null,
          systemType: '',
          applicationType: '',
          downloadURL: '',
          systemName: '',
          version: '',
          forceUpdate: '',
          createTime: ''
        }
      },
      cancelForm () {
        this.resetForm()
        this.visible = false
        this.isEdit = false
      },
      editVersionInfo (row) {
        this.visible = true
        this.isEdit = true
        this.versionForm = {
          id: row.id,
          systemType: row.systemType + '',
          applicationType: row.applicationType + '',
          downloadURL: row.downloadURL,
          systemName: row.systemName,
          version: row.version,
          forceUpdate: row.forceUpdate + '',
          createTime: row.createTime
        }
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
    width: 500px;
  }
}
</style>
