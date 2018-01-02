<template>
  <div>
    <el-header style="text-align: right">
      <div class="filter-item">
        <el-button type="primary" @click="handleCreate">新增<i class="el-icon-circle-plus"></i></el-button>
      </div>
    </el-header>
    <el-main>
      <el-table :data="list" style="text-align: center" border>
        <el-table-column label="网页链接" prop="url" min-width="300"></el-table-column>
        <el-table-column label="网页说明" prop="introduce" min-width="180"></el-table-column>
        <el-table-column label="语言" prop="language" width="60"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editUrl(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog :title="isEdit ? '编辑' : '新增'" :visible.sync="visible">
      <div class="content">
        <el-form :model="urlForm" ref="urlForm" :rules="urlRules" inline>
          <el-form-item label="网页地址" prop="url">
            <el-input v-model="urlForm.url" clearable></el-input>
          </el-form-item>
          <el-form-item label="网页说明">
            <el-input v-model="urlForm.introduce" clearable></el-input>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-select v-model="urlForm.language" style="width: 100px" clearable>
              <el-option v-for="item in languageMap" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有效" prop="status" style="display: block">
            <el-radio-group v-model="urlForm.status">
              <el-radio label="0">无效</el-radio>
              <el-radio label="1">有效</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getUrlInfo, createUrl } from 'api/system'
  export default {
    data () {
      return {
        list: null,
        visible: false,
        isEdit: false,
        urlForm: {
          id: null,
          url: '',
          introduce: '',
          language: '',
          status: ''
        },
        urlRules: {
          url: [{required: true, message: '网址不能为空', trigger: 'blur'}],
          language: [{required: true, message: '语言选择不能为空', trigger: 'change'}],
          status: [{required: true, message: '请选择是否有效', trigger: 'change'}]
        },
        languageMap: ['en', 'ch']
      }
    },
    created () { this.GetUrlInfo() },
    methods: {
      GetUrlInfo () {
        getUrlInfo(this.$route.params.urlId).then(response => {
          this.list = response.data.urlInfo.urlMap
        })
      },
      editUrl (row) {
        this.isEdit = true
        this.visible = true
        this.urlForm = {
          id: row.id,
          url: row.url,
          introduce: row.introduce,
          language: row.language,
          status: row.status + ''
        }
      },
      submitForm () {
        this.$refs.urlForm.validate(valid => {
          if (valid) {
            if (this.isEdit) {
              this.list.forEach((item, index) => {
                if (item.id === this.urlForm.id) {
                  this.list.splice(index, 1, this.urlForm)
                  this.$message.success('编辑成功')
                }
              })
            } else {
              createUrl(this.urlForm).then(() => {
                this.$message.success('新增成功')
                this.list.unshift(this.urlForm)
              })
            }
            this.visible = false
          }
        })
      },
      resetForm () {
        this.isEdit = false
        this.urlForm = {
          id: null,
          url: '',
          introduce: '',
          language: '',
          status: ''
        }
      },
      handleCreate () {
        this.resetForm()
        this.visible = true
        this.$nextTick(() => {
          this.$refs.urlForm.clearValidate()
        })
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = ['无效', '有效']
        return statusMap[status]
      }
    }
  }
</script>
<style lang="less">
.el-dialog .content {
  .el-input { width: 500px }
  .el-select .el-input {
    width: 100px;
  }
}
</style>
