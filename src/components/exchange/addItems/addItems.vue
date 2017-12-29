<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="商品基本信息" name="basicInfo">
        <el-form inline>
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input></el-input>
          </el-form-item>
          <!--<el-form-item label="列表图片" class="listPic">
            <el-upload list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>-->
          <el-form-item label="销售价格" class="form-inline">
            <div class="form-inline-item">
              <el-input></el-input>(人民币)
            </div>
            <div class="form-inline-item">
              <el-input></el-input>(美元)
            </div>
          </el-form-item>
          <el-form-item label="市场价格" class="form-inline">
            <div class="form-inline-item">
              <el-input></el-input>(人民币)
            </div>
            <div class="form-inline-item">
              <el-input></el-input>(美元)
            </div>
          </el-form-item>
          <el-form-item label="销售价格" class="form-inline" style="display: block">
            <el-radio-group v-model="postage">
              <el-radio label="1">包邮</el-radio>
              <el-radio label="0">不包邮</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户积分" class="form-inline">
            <div class="form-inline-item">
              <el-input></el-input>(推荐积分)
            </div>
            <div class="form-inline-item">
              <el-input></el-input>(消费积分)
            </div>
          </el-form-item>
          <el-form-item label="会员积分" class="form-inline">
            <div class="form-inline-item">
              <el-input></el-input>(直接积分)
            </div>
            <div class="form-inline-item">
              <el-input></el-input>(间接积分)
            </div>
          </el-form-item>
          <el-form-item label="合伙人积分" class="form-inline" style="display: block">
            <div class="form-inline-item">
              <el-input></el-input>
            </div>
          </el-form-item>
          <el-form-item label="规格" class="form-inline" style="display: block">
            <div class="form-inline-item">
              <el-input></el-input>
            </div>
          </el-form-item>
          <el-form-item style="text-align: center;display: block">
            <el-button type="primary" @click="activeName = 'detail'">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情" name="detail">
        <tinymce :height="400" v-model="content"></tinymce>
        <div style="text-align: center;margin: 15px auto"><el-button type="primary">确定</el-button></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import tinymce from 'views/tinymce/tinymce'
  export default {
    name: 'addItems',
    data () {
      return {
        activeName: 'basicInfo',
        postage: '',
        content: 'tinymce'
      }
    },
    components: { tinymce }
  }
</script>
<style lang="less" scoped>
  .listPic {
    display: block;
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
