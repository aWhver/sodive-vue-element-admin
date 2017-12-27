<template>
  <el-header>
    <div class="filter-container">
      <div class="filter-item">
        <el-input style="width: 100px" v-model="listQuery.userId" placeholder="ID" clearable></el-input>
      </div>
      <div class="filter-item">
        <el-input style="width: 120px" v-model="listQuery.name" placeholder="姓名" clearable></el-input>
      </div>
      <slot></slot>
      <div class="filter-item filter-select">
        <el-select style="width: 135px" v-model="listQuery.sortId" placeholder="排序" @change="searchBtn()">
          <el-option v-for="item in sortOptions" :key="item.key" :value="item.key" :label="item.label"></el-option>
        </el-select>
      </div>
      <div class="filter-item">
        <el-button type="primary" icon="el-icon-search" @click="searchBtn()">搜索</el-button>
      </div>
    </div>
  </el-header>
</template>
<script>
  export default {
    name: 'certificateFilter',
    props: {
      GetList: {
        type: Function
      }
    },
    data () {
      return {
        listQuery: {
          page: 1,
          limit: 10,
          userId: null,
          sortId: '+id',
          name: null
        },
        sortOptions: [{ label: '按ID升序排列', key: '+id' }, { label: '按ID降序排列', key: '-id' }]
      }
    },
    created () { this.queryToParent() },
    methods: {
      searchBtn () {
        this.listQuery.page = 1
        this.GetList()
      },
      queryToParent () {
        let _this = this
        this.$emit('sendListQuery', {
          listQuery: _this.listQuery
        })
      }
    }
  }
</script>
