<template>
  <div class="scrollBar-wrapper" @wheel.prevent="handleScroll($event)" ref="scrollWrapper">
    <div class="sideBar" :style="{width: collpase? '200px' : '64px','margin-top': `${marginTop}px`}" ref="sideBar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'scroll-bar',
    data () {
      return {
        marginTop: 0
      }
    },
    methods: {
      handleScroll (e) {
        const scrollWrapperHeight = this.$refs.scrollWrapper.offsetHeight
        const sideBarHeight = this.$refs.sideBar.offsetHeight
        const direction = e.wheelDelta || -e.deltaY * 3
        if (direction > 0) { // direction: up
          this.marginTop = Math.min(0, this.marginTop + direction)
        } else {
          if (scrollWrapperHeight < sideBarHeight) {
            if (this.marginTop < (scrollWrapperHeight - sideBarHeight)) {
              this.marginTop = this.marginTop
            } else {
              this.marginTop = Math.max(this.marginTop + direction, scrollWrapperHeight - sideBarHeight)
            }
          } else {
            this.marginTop = 0
          }
        }
      }
    },
    computed: {
      collpase () {
        return !this.$store.state.isCollapse
      }
    },
    watch: {
      collpase (value) { // marginTop is 0 when menu is collapsing
        this.marginTop = value ? this.marginTop : 0
      }
    }
  }
</script>
<style lang="less">
  .scrollBar-wrapper {
    position: fixed;
    height: 100%;
    z-index: 99;
    background: #304156;
    top: 0;
    bottom: 0;
    left: 0;
    .sideBar {
      background: #304156;
      transition: all 0.5s ease-out;
    }
  }
</style>
