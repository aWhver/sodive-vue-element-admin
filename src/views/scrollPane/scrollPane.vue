<template>
  <div class="scroll-wrapper" ref="scrollWrapper" @wheel.prevent="handleScroll($event)">
    <div class="scroll-container" ref="scrollContainer" :style="{left: `${left}px`}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        left: ''
      }
    },
    methods: {
      handleScroll (e) {
        const scrollWrapperWidth = this.$refs.scrollWrapper.offsetWidth
        const scrollContainerWidth = this.$refs.scrollContainer.offsetWidth
        const direction = e.wheelDelta || e.deltaY
        if (direction > 0) {
          this.left = Math.min(0, scrollWrapperWidth - scrollContainerWidth)
        }
      }
    }
  }
</script>
<style lang="less">
.scroll-wrapper {
  position: relative;
  overflow: hidden;
  .scroll-container {
    position: absolute;
  }
}
</style>
