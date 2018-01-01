<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="兑换券订单" name="order">
        <certificate-filter v-on:sendListQuery="acceptQuery" :GetList="GetOrderList">
          <div class="filter-item">
            <el-input v-model="listQuery.orderNo" placeholder="订单号" clearable></el-input>
          </div>
          <div class="filter-item">
            <el-input v-model="listQuery.userId" placeholder="ID" clearable style="width:100px"></el-input>
          </div>
        </certificate-filter>
        <el-main>
          <el-table :data="list" border style="text-align: center" v-loading="loading" element-loading-text="小主,我需要时间...">
            <el-table-column label="序号" prop="id"></el-table-column>
            <el-table-column label="用户ID" prop="userId"></el-table-column>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="昵称" prop="nickName"></el-table-column>
            <el-table-column label="手机" prop="phoneNo"></el-table-column>
            <el-table-column label="支付方式" prop="payType"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"></el-table-column>
            <el-table-column label="更新时间">
              <template slot-scope="scope">
                <span>{{ scope.row | updateTimeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column label="物流状态">
              <template slot-scope="scope">
                <el-tag :type=" scope.row.logisticsStatus | statusTagFilter">{{ scope.row.logisticsStatus | logisticsStatusFilter }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" @click="editInfo(scope.row)">物流操作</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <el-footer>
          <pagination :total="total" :listQuery="listQuery" :GetList="GetOrderList"></pagination>
        </el-footer>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="物流操作" :visible.sync="visible" class="logistics-info" width="570px">
      <el-card>
        <figure><img :src="canEditInfo.goodsPic" alt=""></figure>
        <div class="info-container">
          <div class="info-item">
            <el-form inline>
              <el-form-item label="收货人">
                <span>{{ canEditInfo.receiver }}</span>&nbsp;&nbsp;&nbsp;{{ canEditInfo.phoneNo }}
              </el-form-item>
              <br>
              <el-form-item label="收货地址">
                {{ canEditInfo.receiveAddress }}
              </el-form-item>
              <el-form-item label="物流状态" style="display: block">
                <el-select v-model="canEditInfo.logisticsStatus">
                  <el-option v-for="item in logisticsStatusMap" :key="item.logisticsStatus" :value="item.logisticsStatus" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物流单号">
                <el-input v-model="canEditInfo.logisticsNo" placeholder="输入订单号" clearable></el-input>
              </el-form-item>
              <el-form-item label="物流公司">
                <el-input v-model="canEditInfo.logisticsCompany" placeholder="输入物流公司" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="modifyStatus()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getOrderList } from 'api/order'
  import { formatTime } from 'utils/index'
  const logisticsStatusMap = [
    {logisticsStatus: 0, label: '无物流'},
    {logisticsStatus: 1, label: '待发货'},
    {logisticsStatus: 2, label: '配送中'},
    {logisticsStatus: 3, label: '已签收'},
    {logisticsStatus: 4, label: '拒签收'}
  ]

  const logisticsStatusMapObj = logisticsStatusMap.reduce((obj, item) => {
    obj[item.logisticsStatus] = item.label
    return obj
  }, {})

  export default {
    name: 'order',
    data () {
      return {
        activeName: 'order',
        list: null,
        total: 1,
        listQuery: {page: 1, orderNo: null, userId: null},
        visible: false,
        loading: true,
        logisticsStatusMap: logisticsStatusMap,
        canEditInfo: {
          logisticsStatus: null,
          receiver: '',
          phoneNo: '',
          receiveAddress: '',
          goodsPic: '',
          id: '',
          logisticsNo: '',
          logisticsCompany: ''
        }
      }
    },
    created () { this.GetOrderList() },
    methods: {
      GetOrderList () {
        this.loading = true
        getOrderList(this.listQuery).then(response => {
          this.list = response.data.orderList
          this.total = response.data.total
          this.loading = false
        })
      },
      editInfo (row) {
        this.visible = true
        this.canEditInfo.logisticsStatus = row.logisticsStatus
        this.canEditInfo.receiver = row.receiver
        this.canEditInfo.phoneNo = row.phoneNo
        this.canEditInfo.receiveAddress = row.receiveAddress
        this.canEditInfo.goodsPic = row.goodsPic
        this.canEditInfo.id = row.id
      },
      modifyStatus () {
        if (this.canEditInfo.logisticsNo === '' && this.canEditInfo.logisticsCompany === '') {
          this.$message({message: '物流单号和物流公司不能为空', type: 'warning'})
          return
        } else if (this.canEditInfo.logisticsCompany === '') {
          this.$message({message: '物流公司不能为空', type: 'warning'})
          return
        } else if (this.canEditInfo.logisticsNo === '') {
          this.$message({message: '物流单号不能为空', type: 'warning'})
          return
        }
        for (const i of this.list) {
          if (i.id === this.canEditInfo.id) {
            i.logisticsStatus = this.canEditInfo.logisticsStatus
            i.updateTime = formatTime()
          }
        }
        this.canEditInfo.logisticsNo = ''
        this.canEditInfo.logisticsCompany = ''
        this.visible = false
      },
      acceptQuery (query) {
        this.listQuery = query.listQuery
      }
    },
    filters: {
      updateTimeFilter (row) {
        if (row.logisticsStatus === 0) {
          return
        }
        return row.updateTime
      },
      logisticsStatusFilter (status) {
        return logisticsStatusMapObj[status]
      },
      statusTagFilter (status) {
        const tagType = ['info', 'warning', 'primary', 'success', 'danger']
        return tagType[status]
      }
    }
  }
</script>
<style lang="less">
  .el-tabs__active-bar {width: 70px !important;}
  .el-dialog {
    .el-card__body {
      display: flex;
      align-items: center;
      figure {
        width: 80px;
        height: 80px;
      }
      .info-container {
        flex: 1;
      }
    }
    &__footer { text-align: center; }
  }
</style>
