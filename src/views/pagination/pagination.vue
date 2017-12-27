<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="listQuery.page"
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
      listQuery: {
        type: Object,
        required: true
      },
      total: {
        type: Number,
        required: true
      },
      GetList: {
        type: Function
      }
    },
    methods: {
      handleSizeChange (val) {
        this.listQuery.limit = val
        this.GetList()
      },
      handleCurrentChange (val) {
        this.listQuery.page = val
        this.GetList()
      }
    }
  }
</script>
<style lang="less">

</style>
