<template>
  <div>
    <SideBar></SideBar>
    <div class="main-wrapper" :style="{'margin-left':  isCollapse? '64px' : '200px'}">
      <div class="el-menu-horizontal">
        <Hamburger></Hamburger>
        <BreakCrumb></BreakCrumb>
      </div>
      <tag-views></tag-views>
      <router-view/>
    </div>
  </div>
</template>
<script>
  import SideBar from 'views/sideBar/SideBar'
  import Hamburger from 'views/hamburger/Hamburger'
  import BreakCrumb from 'views/breakCrumb/BreakCrumb'
  import tagViews from 'views/routeTag/Tag'
  import {mapState} from 'vuex'
  export default {
    name: 'app',
    components: {
      SideBar,
      Hamburger,
      BreakCrumb,
      tagViews
    },
    computed: {
      ...mapState([
        'isCollapse',
        'isLogin'
      ])
    }
  }
</script>
