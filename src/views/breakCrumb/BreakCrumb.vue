<template>
  <div class="breakCrumb-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in routerList" :key="item.path">
        <span v-if="item.redirect">{{  item.meta.title }}</span>
        <router-link v-else :to="item.path">{{  item.meta.title }} </router-link>
        <!--<router-link v-if="(index !== 0 || index !== routerList.length-1)" :to="item.path">{{  item.meta.title }} </router-link>-->
        <!--<span v-if="item.redirect">{{  item.meta.title }}</span>-->
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        routerList: []
      }
    },
    created () {
      this.getBreakCrumb()
    },
    methods: {
      getBreakCrumb () {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== 'index') {
          matched = [{path: '/', meta: {title: '首页'}}].concat(matched)
        }
        this.routerList = matched
      }
    },
    watch: {
      $route () {
        this.getBreakCrumb()
      }
    }
  }
</script>
<style lang="less">
  .breakCrumb-container {
    display: inline-block;
    .el-breadcrumb__inner span {
      font-weight: 400;
      color: #606266;
      cursor: text;
    }
  }
</style>
