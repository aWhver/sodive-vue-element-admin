<template>
  <div class="breakCrumb-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in routerList" :key="item.path">
        <router-link v-if="index !== 0 || index !== routerList.length-1" :to="item.path">{{  item.meta.title }} </router-link>
        <span v-else>{{  item.meta.title }}</span>
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
        // console.log(this.$route)
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
  }
</style>
