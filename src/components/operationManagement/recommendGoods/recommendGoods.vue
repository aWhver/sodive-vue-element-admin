<template>
  <div class="production-container">
    <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetRecommendProduction">
      <div class="filter-item">
        <el-input v-model="listQuery.productionName" placeholder="产品名称" clearable></el-input>
      </div>
      <div class="filter-item fr">
        <el-button type="primary" @click="addProduction">新增产品</el-button>
      </div>
    </certificate-filter>
    <el-main>
      <el-table :data="list" border style="text-align: center">
        <el-table-column label="产品名称" prop="productionName"></el-table-column>
        <el-table-column label="产品图片">
          <template slot-scope="scope">
            <img :src="scope.row.productionImage[0].url" width="50" height="50">
          </template>
        </el-table-column>
        <el-table-column label="教练收益" prop="coachProfit"></el-table-column>
        <el-table-column label="是否推荐">
          <template slot-scope="scope">
            <span>{{ scope.row.recommend | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <span>{{ scope.row.effective | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总分享次数" prop="shareNum"></el-table-column>
        <el-table-column label="购买次数" prop="buyNum"></el-table-column>
        <el-table-column label="显示地区">
          <template slot-scope="scope">
            <span>{{ scope.row.showRegion | showRegionFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="editProduction(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <pagination :total="total" :listQuery="listQuery" :GetList="GetRecommendProduction"></pagination>
    </el-footer>
    <el-dialog title="新增/编辑" :visible.sync="visible">
      <el-form inline label-width="120px" label-position="right" :model="productionForm" ref="productionForm" :rules="productionRules">
        <el-form-item label="货品号" prop="productionNo">
          <el-input v-model="productionForm.productionNo" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productionName">
          <el-input v-model="productionForm.productionName" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品图片" prop="productionImage">
          <el-upload action="https://httpbin.org/post" list-type="picture-card" :file-list="productionForm.productionImage" :on-success="handleSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="教练收益" prop="coachProfit">
          <el-input v-model.number="productionForm.coachProfit" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否推荐" prop="recommend">
          <el-radio-group v-model="productionForm.recommend">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否有效" prop="effective">
          <el-radio-group v-model="productionForm.effective">
            <el-radio label="true">有效</el-radio>
            <el-radio label="false">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示地区" prop="showRegion">
          <el-radio-group v-model="productionForm.showRegion">
            <el-radio label="all">全部</el-radio>
            <el-radio label="China">中国</el-radio>
            <el-radio label="abroad">海外</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="详情" prop="detail">
          <tinymce :height="300" v-model="productionForm.detail"></tinymce>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button type="primary" @click="submitForm">发布</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getRecommendProduction, addProduction } from 'api/operationManage'
  import tinymce from 'views/tinymce/tinymce'
  export default {
    name: 'recommendGoods',
    data () {
      return {
        list: null,
        total: 1,
        listQuery: {page: 1, productionName: null},
        visible: false,
        productionForm: {
          productionNo: '',
          productionName: '',
          productionImage: [],
          coachProfit: '',
          recommend: '',
          effective: '',
          showRegion: '',
          detail: '',
          id: (Math.random() * 100000000000).toFixed(0)
        },
        productionRules: {
          productionNo: [{required: true, trigger: 'blur', message: '请输入货品编号'}],
          productionName: [{required: true, trigger: 'blur', message: '请输入产品名称'}],
          productionImage: [{required: true, trigger: 'blur', message: '请上传图片列表'}],
          coachProfit: [{required: true, trigger: 'blur, change', message: '请输入教练收益'}, {type: 'number', message: '此项必须为数字'}],
          recommend: [{required: true, trigger: 'blur, change', message: '请选择是否推荐'}],
          effective: [{required: true, trigger: 'blur, change', message: '请选择是否有效'}],
          showRegion: [{required: true, trigger: 'blur, change', message: '请选择显示地区'}],
          detail: [{required: true, trigger: 'blur', message: '请输入产品详情'}]
        },
        isEdit: false
      }
    },
    created () { this.GetRecommendProduction() },
    methods: {
      GetRecommendProduction () {
        getRecommendProduction(this.listQuery).then(response => {
          this.list = response.data.recommendProduction
          this.total = response.data.total
        })
      },
      submitForm () {
        this.$refs.productionForm.validate(valid => {
          if (valid) {
            if (this.isEdit) {
              for (const [i, item] of this.list.entries()) {
                if (item.id === this.productionForm.id) {
                  console.log(this.productionForm)
                  this.list.splice(i, 1, this.productionForm)
                  this.$message.success('发布成功')
                  break
                }
              }
            } else {
              addProduction(this.productionForm).then(() => {
                this.$message.success('发布成功')
                this.list.unshift(this.productionForm)
              })
            }
            this.visible = false
          }
        })
      },
      editProduction (row) {
        this.isEdit = true
        this.visible = true
        this.productionForm = row
        this.productionForm.recommend = row.recommend + ''
        this.productionForm.effective = row.effective + ''
      },
      addProduction () {
        this.visible = true
        this.isEdit = false
        this.productionForm = {
          productionNo: '',
          productionName: '',
          productionImage: [],
          coachProfit: '',
          recommend: '',
          effective: '',
          showRegion: '',
          detail: ''
        }
        this.$nextTick(() => {
          this.$refs.productionForm.clearValidate()
        })
      },
      handleSuccess (response, file) {
        this.productionForm.productionImage.push({name: file.name, url: file.url})
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      showRegionFilter (type) {
        const regionObj = {'all': '全部', 'China': '中国', 'abroad': '海外'}
        return regionObj[type]
      },
      statusFilter (val) {
        const statusObj = {'true': '是', 'false': '否'}
        return statusObj[val]
      }
    },
    components: { tinymce }
  }
</script>
<style lang="less">
.production-container .el-dialog {
  width: 80%;
  .el-form-item {
    display: block;
    &__content {
      width: 85%;
    }
  }
}
</style>
