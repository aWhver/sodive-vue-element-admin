<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${iconClass}`"></use>
  </svg>
</template>
<script>
  export default {
    name: 'svg-icon',
    props: {
      iconClass: {
        type: String,
        required: true
      }
    }
  }
</script>
<style lang="less">
  .svg-icon {
    font-size: 18px;
    width: 1em;
    height: 1em;
    vertical-align: -0.25em;
    fill: currentColor;
    overflow: hidden;
    margin-right: 1rem;
  }
</style>
