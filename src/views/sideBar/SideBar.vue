<template>
  <scrollBar>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse">
      <template v-for="item in permissionRoutes" v-if="!item.hidden">
        <router-link v-if="item.children && item.children.length === 1" :to="`${item.path}/${item.children[0].path}`"  :key="item.children[0].name" :class="{'noDropdown': isCollapse}">
          <el-menu-item :index="item.children[0].path">
            <svg-icon v-if="item.children[0].meta && item.children[0].meta.icon"  :icon-class="item.children[0].meta.icon"></svg-icon>
            <span>{{item.children[0].meta.title}}</span>
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.path || item.name" :key="item.name">
          <template slot="title">
            <svg-icon v-if="item.meta&&item.meta.icon"  :icon-class="item.meta.icon"></svg-icon>
            <span>{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children">
            <side-bar v-if="child.children" :permissionRoutes="child" :key="child.path"></side-bar>
            <router-link v-else :to="`${item.path}/${child.path}`">
              <el-menu-item :index="child.path">
                <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
                <span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </scrollBar>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import scrollBar from 'views/scrollBar/scrollBar'
  export default {
    name: 'SideBar',
    computed: {
      ...mapState([
        'isCollapse'
      ]),
      ...mapGetters([
        'permissionRoutes'
      ])
    },
    components: { scrollBar }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .el-menu {
    background: #304156;
    border: none;
  }
  .el-menu-item,.el-submenu__title span {color: #fff;}
  .el-submenu .el-menu-item[data-v-614c2078] {
    background: #1f2d3d;
  }
  .noDropdown span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    transition: opacity .5s ease-out;
    opacity: 0;
    display: inline-block;
  }
  .el-menu-item:focus, .el-menu-item:hover {
    background: #263445;
  }
  .el-submenu .el-menu-item[data-v-614c2078][data-v-614c2078]:hover {
    background: #001528;
  }
</style>
