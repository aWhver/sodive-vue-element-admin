<template>
  <div>
    <SideBar></SideBar>
    <div class="main-wrapper" :style="{'margin-left':  isCollapse? '64px' : '200px'}">
      <div class="el-menu-horizontal">
        <Hamburger></Hamburger>
        <BreakCrumb></BreakCrumb>
      </div>
      <tag-views></tag-views>
      <div class="app-main">
        <keep-alive :include="cacheTags">
          <transition name="fade" mode="out-in" appear>
            <router-view/>
          </transition>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import SideBar from 'views/sideBar/SideBar'
  import Hamburger from 'views/hamburger/Hamburger'
  import BreakCrumb from 'views/breakCrumb/BreakCrumb'
  import tagViews from 'views/routeTag/Tag'
  import {mapState, mapGetters} from 'vuex'
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
        'isCollapse'
      ]),
      ...mapGetters([
        'cacheTags'
      ])
    }
  }
</script>
