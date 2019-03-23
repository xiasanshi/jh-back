/**
* ----------------------------------------------------------
* index
*
* @version  1.0
* @author xialei
* @email 15755372104@126.com
*
* @module src/pages/index
* ----------------------------------------------------------
*/
<template>
    <div>
        <div slot="header" class="clearfix">
            <!--<span>今日统计</span>-->
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div style="width:100%;height: 200px;border: 1px">
            <div style="width:30%;height: 100%;float: left;margin-right: 10px;text-align: center;padding:10px 0">
                <el-card style="width: 100%;text-align: center;margin: 0 auto">
                    <h1 style="font-size: 30px">今日营业额</h1>
                    <P style="font-size: 25px">{{usedAmout}}元 | {{totalNum}}笔</P>
                </el-card>
                <!--<div style="width: 100%;height: 10px;background-color: #ffffff"></div>-->
                <!--<el-card style="margin-top:10px ">
                    <h1 style="font-size: 30px">优惠后实际收入</h1>
                    <P style="font-size: 25px">{{usedAmout}}元</P>
                </el-card>-->
            </div>
            <div style="width:30%;height: 100%;float: left;margin-right: 10px;padding: 10px">
                <el-card style="margin-top:0px;text-align: center;margin: 0 auto">
                    <h1 style="font-size: 30px">优惠后实际收入</h1>
                    <P style="font-size: 25px">{{usedAmout}}元</P>
                </el-card>
            </div>
            <div style="width:30%;height: 100%;float: left;margin-right: 10px;padding: 10px">
                <el-card style="text-align: center;margin: 0 auto">
                    <h1 style="font-size: 30px">账户余额</h1>
                    <P style="font-size: 25px">{{usedAmout}}元</P>
                    <!--<el-button type="primary" @click="withdraw()">全部提出</el-button>-->
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import {Stat} from '../../api/api'

export default {
  name: 'index',
  data () {
    return {
      usedCoupon: {},
      usedNum: 0,
      usedAmout: 0.0,
      // business:{},
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,
      chartdata: {},
      business: null,
      listLoading: false,
      balance: '0', // 实际收入
      totalNum: '0', // 总单数
      orderInfoList: [], // 订单详情,
      lineHeader: [],
      feeList: [],
      orderList: [],
      form: {
        'startDate': '',
        'endDate': ''
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: ''
    }
  },
  methods: {
    getbusiStat (val) {
      let para = {'businessId': this.businessId, 'durationText': val}
      this.listLoading = true
      let stat = new Stat()
      stat.getBusinessStat(para).then((res) => {
        if (res.data.code === 0) {
          this.usedAmout = res.data.data.amount
          this.balance = res.data.data.balance
          this.totalNum = res.data.data.totalNum
          this.orderInfoList = res.data.data.notificationMap
          this.listLoading = false
        } else {
          this.listLoading = false
          this.$message({
            message: '网络异常，请稍后重试',
            type: 'error'
          })
        }

        // NProgress.done();
      })
    }
  },
  mounted () {
    this.businessId = sessionStorage.getItem('businessId')
    this.getbusiStat('oneDay')
  }
}
</script>

<style scoped>

</style>
