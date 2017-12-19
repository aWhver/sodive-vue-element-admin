<template>
  <div class="scroll-wrapper" ref="scrollWrapper" @wheel.prevent="handleScroll($event)">
    <div class="scroll-container" ref="scrollContainer" :style="{left: `${left}px`}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'scroll-pane',
    data () {
      return {
        left: 0
      }
    },
    methods: {
      handleScroll (e) {
        const scrollWrapperWidth = this.$refs.scrollWrapper.offsetWidth
        const scrollContainerWidth = this.$refs.scrollContainer.offsetWidth
        const direction = e.wheelDelta || -e.deltaY * 3
        if (direction > 0) {
          this.left = Math.min(0, this.left + direction)
        } else {
          if (scrollWrapperWidth < scrollContainerWidth) {
            if (this.left < (scrollWrapperWidth - scrollContainerWidth)) {
              this.left = this.left
            } else {
              this.left = Math.max(this.left + direction, scrollWrapperWidth - scrollContainerWidth)
            }
          } else {
            this.left = 0
          }
        }
      },
      moveToTarget (target) {
        const scrollWrapperWidth = this.$refs.scrollWrapper.offsetWidth
        const scrollContainerWidth = this.$refs.scrollContainer.offsetWidth
        const targetWidth = target.offsetWidth
        const targetLeft = target.offsetLeft
        if (targetLeft < ((scrollWrapperWidth - targetWidth) / 2)) {
          // tag in the left
          this.left = 0
        } else {
          // tag in the right
          this.left = Math.max(-(scrollContainerWidth - scrollWrapperWidth), -(targetLeft - (scrollWrapperWidth - targetWidth / 2)) - scrollWrapperWidth / 2)
        }
      }
    }
  }
</script>
<style lang="less">
.scroll-wrapper {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  .scroll-container {
    position: absolute;
    transition: left 0.3s linear;
  }
}
</style>
