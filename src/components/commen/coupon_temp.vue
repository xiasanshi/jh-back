<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.couponName" placeholder="优惠券"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getAllCoupon">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增优惠券</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addGroupon">新增拼团</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="coupons" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="45">
            </el-table-column>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="couponName" label="优惠券名称" width="150" sortable>
            </el-table-column>
            <el-table-column prop="couponType" label="优惠券种类" width="150" :formatter="formatCouponType" sortable>
            </el-table-column>
            <el-table-column prop="bussinessDTO.bussinessName" label="所属商家" width="150" sortable>
            </el-table-column>
            <el-table-column prop="couponStatus" label="优惠券状态" min-width="130" :formatter="formatCouponStatus" sortable>
            </el-table-column>
            <!--<el-table-column prop="couponName" label="地址" min-width="180" sortable>-->
            <!--</el-table-column>-->
            <el-table-column label="操作" width="250">
                <template scope="scope">
                    <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">下架</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量下架</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--详情界面-->
        <el-dialog title="查看" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="优惠券名称" prop="couponName">
                    <el-input v-model="editForm.couponName" auto-complete="off" style="color: #E4E7ED"
                              :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="优惠券种类" prop="couponType">
                    <el-input v-bind:value="editForm.couponType == 1 ? '代金券' : editForm.couponType == 2 ? '折扣券' : '礼品券'"
                              auto-complete="off" style="color: #E4E7ED" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始日期" v-model="editForm.activityDurationStart"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2"> &nbsp;</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束日期" v-model="editForm.activityDurationEnd"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="优惠券售价">
                    <el-input v-model="editForm.couponPrice" :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="优惠券面额">
                    <el-input v-model="editForm.discountPrice" :disabled="true">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="券有效期">
                    <el-radio v-model="radio7" label="1" border :disabled="true">
                        <el-input placeholder="请输入时间" v-model="editForm.workingDays" class="input-with-select"
                                  :disabled="true">
                            <template slot="prepend">自购买之日起
                            </template>
                            <template slot="append">日内</template>
                        </el-input>
                    </el-radio>
                    <template><br/>
                        <p></p></template>
                    <el-radio v-model="radio7" label="2" border>
                        <template>
                            <el-date-picker type="date" placeholder="开始日期" v-model="editForm.useDurationStart"
                                            style=""></el-date-picker>
                            <el-date-picker type="date" placeholder="结束日期" start-placeholder="editForm.useDurationStart"
                                            change="checkTimer()" v-model="editForm.useDurationEnd"
                                            style=""></el-date-picker>
                        </template>
                    </el-radio>
                </el-form-item>
                <el-form-item label="使用说明">
                    <el-input type="textarea" v-model="editForm.useCondition" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center"><p><b>--使用条件--</b></p></el-form-item>
                <el-form-item label="最低消费">
                    <el-input v-model="editForm.lowestConsume" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="限时抢购">
                    <el-input v-bind:value="editForm.isFlashsale == 1 ? '是' : '否'" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="限领数量">
                    <el-input v-model="editForm.couponNumLimit" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="发放数量">
                    <el-input v-model="editForm.couponStock" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="使用范围">
                    <el-input v-model="editForm.couponRank" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="使用时间段">
                    <el-col :span="11">
                        <el-time-picker type="time" placeholder="开始时间" v-model="editForm.useDurationStartTime"
                                        style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2"> &nbsp;</el-col>
                    <el-col :span="11">
                        <el-time-picker type="time" placeholder="结束时间" v-model="editForm.useDurationEndTime"
                                        style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="优惠券名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="优惠券种类">
                    <el-select v-model="addForm.region" placeholder="请选择优惠券种类">
                        <el-option label="代金券" value="shanghai"></el-option>
                        <el-option label="折扣券" value="discount"></el-option>
                        <el-option label="礼品券" value="xx"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始日期" v-model="addForm.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2"> &nbsp;</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束日期" v-model="addForm.date2"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="优惠券售价">
                    <el-input v-model="addForm.price">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="优惠券面额">
                    <el-input v-model="addForm.price">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="券有效期">
                    <!--<el-radio v-model="radio7" label="1" border>-->
                    <!--<el-input placeholder="请输入时间" v-model="input5" class="input-with-select">-->
                    <!--<template slot="prepend">自购买之日起-->
                    <!--</template>-->
                    <!--<template slot="append">日内</template>-->
                    <!--</el-input>-->
                    <!--</el-radio>-->
                    <template><br/>
                        <p></p></template>
                    <el-radio v-model="radio7" label="2" border>
                        <template>
                            <el-date-picker type="date" placeholder="结束日期" v-model="addForm.date3"
                                            style="width: 100%;"></el-date-picker>
                        </template>
                    </el-radio>
                </el-form-item>
                <el-form-item label="使用说明">
                    <el-input type="textarea" v-model="addForm.desc"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center"><p><b>--使用条件--</b></p></el-form-item>
                <el-form-item label="最低消费">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="限领数量">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="发放数量">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="使用范围">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="使用时间段">
                    <el-col :span="11">
                        <el-time-picker type="time" placeholder="开始时间" v-model="addForm.time1"
                                        style="width: 100%;"></el-time-picker>
                    </el-col>
                    <el-col class="line" :span="2"> &nbsp;</el-col>
                    <el-col :span="11">
                        <el-time-picker type="time" placeholder="结束时间" v-model="addForm.time2"
                                        style="width: 100%;"></el-time-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">立即创建</el-button>
                    <el-button @click.native.prevent>取消</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import util from '../../common/js/util'
import addCoupon from '../../views/coupon/create'
// import NProgress from 'nprogress'
import {
  batchRemoveUser,
  editUser,
  addUser,
  getAllCoupons,
  removeCoupon
} from '../../api/api'

export default {
  name: 'coupon_temp',
  comments: {addCoupon},
  data () {
    return {
      filters: {
        couponName: ''
      },
      bussiness: {
        bussinessId: ''
      },
      coupons: [],
      total: 0,
      page: 2,
      listLoading: false,
      sels: [], // 列表选中列
      radio7: '',
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      },
      // 查看界面数据
      editForm: {
        couponName: '', // 优惠券名称,
        couponType: 1, // 优惠券种类
        couponStock: '', // 优惠券数量
        couponPrice: '0', // 优惠券价格
        discountPrice: '0', // 抵扣价
        creditPrice: '0', // 积分价格
        useCondition: '', // 使用条件
        bussinessId: '', // 商家id
        couponRank: '', // 优惠券使用范围
        couponIcon: '', // 优惠券图标
        isFlashsale: '0', // 是否为限时抢购优惠券
        activityDurationStart: '', // 活动开始有效期
        activityDurationEnd: '', // 活动结束有效期
        useDurationStart: '', // 消费开始有效期  //活动开始有效期
        useDurationEnd: '', // 活动结束有效期
        useDurationStartTime: '', // 每天消费开始有效期
        useDurationEndTime: '', // 每天活动结束有效期
        lowestConsume: '', // 最低消费
        couponNumLimit: '', // 领券限额
        workingDays: '' // 生效时间
      },

      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      },
      // 新增界面数据
      addForm: {
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }

    }
  },
  methods: {
    // 性别显示转换
    formatCouponType: function (row, column) {
      return row.couponType === 1 ? '代金券' : row.couponType === 2 ? '折扣券' : '礼品券'
    },
    formatCouponStatus: function (row, column) {
      return row.couponStatus === 0 ? '使用中' : '已下架'
    },
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },

    handleCurrentChange (val) {
      this.page = val
      this.getAllCoupon()
    },

    // 获取优惠券列表
    getAllCoupon (mag) {
      // alert("sss1")
      // alert(mag)
      let para = ''
      if (mag === 'all') {
        para = {}
      } else {
        this.business = mag
        // alert("sss2")
        para = {
          'businessName': mag.bussinessName,
          'name': this.filters.couponName
        }
      }

      // alert("sss3")
      // let para = '';
      this.listLoading = true
      // axios.get('http://wx.qingzhao.net.cn/fanZone/seller/coupon/list').then(function (res) {
      //     alert(res)
      // })
      // NProgress.start();
      // alert("sss4")
      getAllCoupons(para).then((res) => {
        // alert("ss")
        // this.total = res.data.total;
        if (res.data.code === 0) {
          // alert('xxx')

          this.coupons = res.data.data.couponList
          // debugger
          console.log(this.coupons)
        } else {
          this.$message({
            message: '啊偶，网络出问题了',
            type: 'error'
          })
          // alert('else')
        }
        // console.log(res)

        this.listLoading = false
        // NProgress.done();
      })
    },

    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = {couponId: row.couponId}
        removeCoupon(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getAllCoupon()
        })
      }).catch(() => {

      })
    },

    // 显示查看界面
    handleEdit: function (index, row) {
      console.log(index)
      console.log(row)
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },

    // 显示新增界面
    handleAdd: function () {
      sessionStorage.setItem('businessid', this.business.bussinessId)
      this.$router.push({
        path: '/addCoupon',
        name: '',
        params: {
          id: this.business.bussinessId,
          dataObj: 'dddd'
        }
      })
    },
    addGroupon: function () {
      sessionStorage.setItem('businessid', this.business.bussinessId)
      this.$router.push({
        path: '/addGroupon',
        name: '',
        params: {
          id: this.business.bussinessId,
          dataObj: 'dddd'
        }
      })
    },
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getAllCoupon()
            })
          })
        }
      })
    },
    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            // NProgress.start();
            let para = Object.assign({}, this.addForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            addUser(para).then((res) => {
              this.addLoading = false
              // NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['addForm'].resetFields()
              this.addFormVisible = false
              this.getAllCoupon()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },

    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = {ids: ids}
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getAllCoupon()
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    // this.getAllCoupon(this.business);
  }
}

</script>

<style scoped>
    el-table, el-table-column {
        text-align: center;
    }
</style>
