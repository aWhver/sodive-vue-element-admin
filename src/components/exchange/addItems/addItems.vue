<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品基本信息" name="basicInfo">
        <el-form inline>
          <el-form-item label="商品名称">
            <el-input v-model="formData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="formData.stock"></el-input>
          </el-form-item>
          <el-form-item label="列表图片" class="listPic">
            <el-upload action="https://httpbin.org/post" :file-list="formData.listImage" :multiple="true" :show-file-list="true"  list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="销售价格" class="form-inline">
            <div class="form-inline-item">
              <el-input v-model="formData.price * 6"></el-input>(人民币)
            </div>
            <div class="form-inline-item">
              <el-input v-model="formData.price"></el-input>(美元)
            </div>
          </el-form-item>
          <el-form-item label="市场价格" class="form-inline">
            <div class="form-inline-item">
              <el-input v-model="formData.marketPrice * 6"></el-input>(人民币)
            </div>
            <div class="form-inline-item">
              <el-input v-model="formData.marketPrice"></el-input>(美元)
            </div>
          </el-form-item>
          <el-form-item label="是否包邮" class="form-inline" style="display: block">
            <el-radio-group v-model="formData.freeDeliver">
              <el-radio label="1">包邮</el-radio>
              <el-radio label="0">不包邮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户积分" class="form-inline">
            <div class="form-inline-item">
              <el-input v-model="formData.userPoint"></el-input>(推荐积分)
            </div>
            <div class="form-inline-item">
              <el-input v-model="formData.userPoint"></el-input>(消费积分)
            </div>
          </el-form-item>
          <el-form-item label="教练积分" class="form-inline">
            <div class="form-inline-item">
              <el-input v-model="formData.coachPoint"></el-input>(直接积分)
            </div>
            <div class="form-inline-item">
              <el-input v-model="formData.coachPoint"></el-input>(间接积分)
            </div>
          </el-form-item>
          <el-form-item label="合伙人积分" class="form-inline" style="display: block">
            <div class="form-inline-item">
              <el-input  v-model="formData.agentPoint"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="规格" class="form-inline" style="display: block">
            <div class="form-inline-item">
              <el-input  v-model="formData.size"></el-input>
            </div>
          </el-form-item>
          <el-form-item style="text-align: center;display: block">
            <el-button type="primary" @click="activeName = 'detail'">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="detail">
        <tinymce :height="400" v-model="formData.description"></tinymce>
        <div style="text-align: center;margin: 15px auto"><el-button type="primary" @click="submitForm">确定</el-button></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  import { getDetail } from 'api/exchange'
  const formDefault = {
    goodsName: '',
    stock: null,
    marketPrice: null,
    price: null,
    freeDeliver: '',
    userPoint: null,
    coachPoint: null,
    agentPoint: null,
    size: '',
    description: '',
    listImage: []
  }
  export default {
    name: 'addItems',
    data () {
      return {
        formData: {...formDefault},
        activeName: 'basicInfo'
      }
    },
    created () {
      this.fetchDetail()
    },
    watch: {
      $route () { this.fetchDetail() }
    },
    methods: {
      fetchDetail () {
        if (this.$route.params.id) {
          getDetail(this.$route.params.id).then(response => {
            this.formData = response.data.dataObj
            this.formData.description = `<img src="${response.data.dataObj.image}">`
            this.formData.freeDeliver = response.data.dataObj.freeDeliver + ''
          })
        } else {
          this.formData = {...formDefault}
        }
      },
      submitForm () {
        this.$notify({
          title: '操作成功',
          message: '商品信息已完成',
          type: 'success'
        })
      }
    },
    components: { tinymce }
  }
</script>
<style lang="less" scoped>
  .listPic {
    display: block !important;
  }
  .form-inline .el-form-item__content {
    .form-inline-item {
      display: inline-block;
      width: 400px;
      .el-input {
        width: 70%;
      }
    }
  }
</style>
