<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="10"
    :page-sizes="[10, 15, 30, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    background>
  </el-pagination>
</template>
<script>
  export default {
    name: 'pagination',
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      handleSizeChange: {
        type: Function
      },
      handleCurrentChange: {
        type: Function
      }
    }
  }
</script>
<style lang="less">

</style>
