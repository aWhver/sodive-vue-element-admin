<template>
  <div>
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetBannerList">
      <div class="filter-item">
        <el-input v-model="listQuery.title" placeholder="标题" clearable></el-input>
      </div>
      <div class="filter-item fr">
        <el-button type="primary" @click="addBanner">新增</el-button>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
        <el-table-column label="标题" prop="title" align="left" width="300px"></el-table-column>
        <el-table-column label="banner图">
          <template slot-scope="scope">
            <img :src="scope.row.banner[0].url" width="100" height="65" alt="">
          </template>
        </el-table-column>
        <el-table-column label="url" prop="url" align="left" min-width="260px"></el-table-column>
        <el-table-column label="用户类型">
          <template slot-scope="scope">
            <span>{{ scope.row.type | typeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="是否有效" width="150px">
          <template slot-scope="scope">
            <el-button :type="scope.row.effective | effectiveTagFilter" @click="changeStatus(scope.row)">{{ scope.row.effective | effectiveFilter }}</el-button>
            <el-button type="primary" @click="editBanner(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetBannerList"></pagination>
    </el-footer>
    <el-dialog title="新增/编辑banner" :visible.sync="visible" center class="banner-dialog">
      <el-form :model="bannerForm" ref="bannerForm" :rules="bannerRules" label-width="140px" position-label="right">
        <el-form-item label="用户类型" prop="type">
          <el-radio-group v-model="bannerForm.type">
            <el-radio label="user">用户端</el-radio>
            <el-radio label="pro">教练端</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="bannerForm.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="url标题" prop="title">
          <el-input v-model="bannerForm.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="banner图" prop="banner">
          <el-upload action="https://httpbin.org/post" list-type="picture-card" :file-list="bannerForm.banner" :on-success="handleSuccess" :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed"><i class="el-icon-plus"></i></el-upload>
        </el-form-item>
        <el-form-item label="是否有效" prop="effective">
          <el-radio-group v-model="bannerForm.effective">
            <el-radio label="effective">有效</el-radio>
            <el-radio label="ineffective">无效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getBannerList, editBanner } from 'api/operationManage'
  import { formatTimeCustom } from 'utils/index'
  export default {
    name: 'adManage',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, title: null},
        loading: true,
        visible: false,
        isEdit: false,
        bannerForm: {
          id: '',
          type: '',
          url: '',
          title: '',
          banner: [],
          effective: ''
        },
        bannerRules: {
          type: [{required: true, trigger: 'blur', message: '请选择终端类型'}],
          url: [{required: true, trigger: 'blur', message: '请填写banner地址'}, { type: 'url', message: '请输入正确的地址', trigger: 'blur,change' }],
          title: [{required: true, trigger: 'blur', message: '请填写banner标题'}],
          banner: [{required: true, trigger: 'blur', message: '请上传banner图片'}],
          effective: [{required: true, trigger: 'blur', message: '请选择是否有效'}]
        }
      }
    },
    created () { this.GetBannerList() },
    methods: {
      GetBannerList () {
        this.loading = true
        getBannerList(this.listQuery).then(response => {
          this.list = response.data.bannerList
          this.total = response.data.total
          this.loading = false
        })
      },
      changeStatus (row) {
        row.effective = row.effective === 'effective' ? 'ineffective' : 'effective'
        this.$notify({
          title: 'Prompt',
          message: '已修改此banner状态',
          type: 'success',
          duration: 2000
        })
      },
      addBanner () {
        this.isEdit = false
        this.visible = true
        this.bannerForm = {
          id: '',
          type: '',
          url: '',
          title: '',
          banner: [],
          effective: '',
          createTime: ''
        }
        this.$nextTick(() => {
          this.$refs.bannerForm.clearValidate()
        })
      },
      editBanner (row) {
        this.isEdit = true
        this.visible = true
        this.bannerForm = row
      },
      submitForm () {
        this.$refs.bannerForm.validate(valid => {
          if (this.bannerForm.banner.length === 0) this.$message.warning('请等待图片上传完成')
          if (valid) {
            editBanner(this.bannerForm).then(response => {
              if (this.isEdit) {
                for (let item of this.list) {
                  if (item.id === this.bannerForm.id) {
                    item = this.bannerForm
                    this.$notify({
                      title: 'Prompt',
                      message: '编辑banner成功',
                      type: 'success'
                    })
                    break
                  }
                }
              } else {
                this.bannerForm.createTime = formatTimeCustom(new Date(), '{y}-{m}-{d}')
                this.list.unshift(this.bannerForm)
                this.$notify({
                  title: 'Prompt',
                  message: '新增banner成功',
                  type: 'success'
                })
              }
              this.visible = false
            })
          }
        })
      },
      handleSuccess (response, file) {
        this.bannerForm.banner = [] // 用delete删除的元素是undefined,因此在这清空(仅限上传一张图片时),待优化
        this.bannerForm.banner.push({name: file.name, url: file.url})
      },
      handleRemove (file) {
        if (this.bannerForm.banner.length !== 0) {
          this.bannerForm.banner.forEach((item, index) => {
            if (item.url === file.url) {
              delete this.bannerForm.banner[0]
            }
          })
        }
      },
      handleExceed (files, fileList) {
        this.$message.warning('仅限上传一张图片')
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      typeFilter (type) {
        const typeObj = {user: '用户端', pro: '教练端'}
        return typeObj[type]
      },
      effectiveFilter (effective) {
        const effectiveObj = {effective: '有效', ineffective: '无效'}
        return effectiveObj[effective]
      },
      effectiveTagFilter (effective) {
        const effectiveTagObj = {effective: 'success', ineffective: 'danger'}
        return effectiveTagObj[effective]
      }
    }
  }
</script>
<style lang="less">

</style>
