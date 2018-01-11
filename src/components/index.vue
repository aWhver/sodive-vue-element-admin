<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="8">
        <el-card>
          <div class="grid-content">
            <div class="box-title">
              <span class="fr month">月</span>
              <h5>会员</h5>
            </div>
            <div class="box-content">
              <div><h2>279</h2></div>
              <div>
                <!--<span class="fr"></span>-->
                <h5>总数</h5>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="8">
        <el-card>
          <div class="grid-content">
            <div class="box-title">
              <router-link class="fr" to="userManage/coachExamine">
                <el-button icon="el-icon-arrow-right" type="primary"></el-button>
              </router-link>
              <h5>证书审核</h5>
            </div>
            <div class="box-content">
              <div><h2>279</h2></div>
              <div>
                <span class="fr"></span>
                <h5>需要审核的新证书</h5>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!--<el-col :xs="24" :sm="12" :md="12" :lg="8">
        <el-card>
          <div class="grid-content">
            <div class="box-title">
              <span class="fr month">最近一个月</span>
              <h5>活跃用户</h5>
            </div>
            <div class="box-content">
              <div><h2>279</h2></div>
              <div>
                &lt;!&ndash;<span class="fr"></span>&ndash;&gt;
                <h5>总数</h5>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>-->
    </el-row>
    <newuser-chart></newuser-chart>
    <!--<el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="12" :lg="12">
        <el-card>
          <div class="grid-content">
            <div class="box-title">
              <router-link class="fr" to="userManage/coachExamine">
                <el-button icon="el-icon-arrow-right" type="primary"></el-button>
              </router-link>
              <h5>证书审核</h5>
            </div>
            <div class="box-content">
              <div><h2>55</h2></div>
              <div>
                &lt;!&ndash;<span class="fr"></span>&ndash;&gt;
                <h5>需要审核的新证书</h5>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>
<script>
  import newuserChart from 'views/echarts/newUserChart'
  export default {
    data () {
      return {}
    },
    components: { newuserChart }
  }
</script>
<style lang="less">
.box {
  padding: 10px 0;
  .el-row {
    .el-col {
      margin-bottom: 20px;
    }
  }
  &-title span.month {
    border-radius: 4px;
    background: #1c84c6;
    color: #fff;
    padding: 2px 6px;
  }
  .el-button {
    padding: 3px 6px;
  }
}
</style>
