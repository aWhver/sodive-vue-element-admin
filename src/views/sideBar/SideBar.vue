<template>
  <scrollBar>
    <el-menu mode="vertical" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#304156" text-color="#ffffff" style="border: none">
      <sidebar-item :permissionRoutes="permissionRoutes"></sidebar-item>
    </el-menu>
  </scrollBar>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import scrollBar from 'views/scrollBar/scrollBar'
  import sidebarItem from './sidebarItem.vue'
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
    components: { scrollBar, sidebarItem }
  }
</script>
