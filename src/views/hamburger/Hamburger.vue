<template>
  <div class="hamburger" :class="{'collapsein': isCollapse}">
    <el-button @click="changeCollapse()" >
      <span class="line-top line"></span>
      <span class="line-middle line"></span>
      <span class="line-bottom line"></span>
    </el-button>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'Hamburger',
    methods: {
      ...mapMutations([
        'openSideBar'
      ]),
      changeCollapse () {
        this.openSideBar()
      }
    },
    computed: {
      ...mapState([
        'isCollapse'
      ])
    }
  }
</script>
<style lang="less">
  .hamburger {
    display: inline-block;
    margin-right: 15px;
    .el-button {
      padding: 5px 10px;
    }
    .line {
      background: #000;
      height: 2px;
      width: 18px;
      margin: 3px 0;
      display: block;
      transition: transform,width linear 0.4s;
    }
    &:hover .line-top {
      transform: rotate(-45deg) translateX(-1px) translateY(1px);
      width: 50%;
    }
    &:hover .line-bottom {
      transform: rotate(45deg) translateX(-1px) translateY(-1px);
      width: 50%;
    }
    &.collapsein:hover .line-top {
      transform: rotate(-135deg) translateX(-7px) translateY(6px);
      width: 50%;
    }
    &.collapsein:hover .line-bottom {
      transform: rotate(135deg) translateX(-7px) translateY(-6px);
      width: 50%;
    }
  }
</style>
