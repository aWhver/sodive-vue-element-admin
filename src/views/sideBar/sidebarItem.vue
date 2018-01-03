<template>
  <div class="menu-wrapper">
    <!-- 若要使用3级及以上路由，切记不能把该组件和scrollBar组件放在同一组件循环，要单独循环该组件放到scrollBar组件 -->
    <template v-for="item in permissionRoutes" v-if="!item.hidden">
      <router-link v-if="item.children && item.children.length === 1 && !item.children[0].children" :to="`${item.path}/${item.children[0].path}`"  :key="item.children[0].name" :class="{'noDropdown': isCollapse}">
        <el-menu-item :index="item.children[0].path">
          <svg-icon v-if="item.children[0].meta && item.children[0].meta.icon"  :icon-class="item.children[0].meta.icon"></svg-icon>
          <span>{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.path || item.name" :key="item.path">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon"  :icon-class="item.meta.icon"></svg-icon>
          <span slot="title">{{item.meta.title }}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item class="nest-submenu" v-if="child.children" :permissionRoutes="[child]" :key="child.path"></sidebar-item>
          <router-link v-else-if="!child.hidden" :to="`${item.path}/${child.path}`">
            <el-menu-item :index="child.path">
              <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta && child.meta.title">{{child.meta.title}} </span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import scrollBar from 'views/scrollBar/scrollBar'
  export default {
    name: 'sidebarItem',
    props: {
      permissionRoutes: {
        type: Array
      }
    },
    data () {
      return { isCollapse1: true }
    },
    computed: {
      ...mapState([
        'isCollapse'
      ])
    },
    components: { scrollBar }
  }
</script>
<style lang="less">
  .menu-wrapper {
    .noDropdown span {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
      transition: opacity .5s ease-out;
      opacity: 0;
      display: inline-block;
    }
  }
</style>
