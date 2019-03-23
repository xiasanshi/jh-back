<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.prevent="onSubmit"
             style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="优惠券名称" prop="couponName">
            <el-input v-model="form.couponName"></el-input>
        </el-form-item>
        <el-form-item label="优惠券种类" prop="couponType">
            <el-select v-model="form.couponType" placeholder="请选择优惠券种类">
                <el-option label="代金券" value=1></el-option>
                <!--<el-option label="折扣券" value=2></el-option>-->
                <el-option label="礼品券" value=3></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-col :span="11" prop="activityDurationStart">
                <el-date-picker type="date" placeholder="开始日期" v-model="form.activityDurationStart"
                                style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2"> &nbsp;</el-col>
            <el-col :span="11" prop="activityDurationEnd">
                <el-date-picker type="date" placeholder="结束日期" v-model="form.activityDurationEnd"
                                style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="优惠券售价">
            <el-input v-model="form.couponPrice">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="优惠券面额" prop="discountPrice">
            <el-input v-model="form.discountPrice">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="券有效期">
            <el-radio v-model="radio7" label="1" border>
                <el-input placeholder="请输入时间" v-model="form.workingDays" class="input-with-select">
                    <template slot="prepend">自购买之日起
                    </template>
                    <template slot="append">日内</template>
                </el-input>
            </el-radio>
            <template><br/>
                <p></p></template>
            <el-radio v-model="radio7" label="2" border>
                <template>
                    <el-date-picker type="date" placeholder="开始日期" v-model="form.useDurationStart"
                                    style=""></el-date-picker>
                    <el-date-picker type="date" placeholder="结束日期" start-placeholder="form.useDurationStart"
                                    change="checkTimer()" v-model="form.useDurationEnd"
                                    style=""></el-date-picker>
                </template>
            </el-radio>
        </el-form-item>
        <el-form-item label="使用说明">
            <el-input type="textarea" v-model="form.useCondition"></el-input>
        </el-form-item>
        <el-form-item label="活动logo">
            <el-upload
                class="upload-demo"
                action="http://wx.qingzhao.net.cn/fanZone/common/saveImage"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :file-list="fileList2"
                name="file"
                :limit="1"
                :before-upload="beforeAvatarUpload"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item style="text-align: center"><p><b>--使用条件--</b></p></el-form-item>
        <el-form-item label="限时抢购">
            <el-switch
                v-model="form.isFlashsale"
                active-text="限时抢购"
                inactive-value="0"
                active-value="1">
            </el-switch>
        </el-form-item>
        <el-form-item label="最低消费">
            <el-input v-model="form.lowestConsume"></el-input>
        </el-form-item>
        <el-form-item label="限领数量">
            <el-input v-model="form.couponNumLimit"></el-input>
        </el-form-item>
        <el-form-item label="发放数量">
            <el-input v-model="form.couponStock"></el-input>
        </el-form-item>
        <el-form-item label="使用范围">
            <el-input v-model="form.couponRank"></el-input>
        </el-form-item>
        <el-form-item label="使用时间段">
            <el-col :span="11">
                <el-time-picker type="time" placeholder="开始时间" v-model="form.useDurationStartTime"
                                style="width: 100%;"></el-time-picker>
            </el-col>
            <el-col class="line" :span="2"> &nbsp;</el-col>
            <el-col :span="11">
                <el-time-picker type="time" placeholder="结束时间" v-model="form.useDurationEndTime"
                                style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit(form)">立即创建</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {saveCoupons} from '../../api/api'

export default {
  data () {
    return {
      radio7: '1',
      form: {
        couponName: '', // 优惠券名称,
        couponType: '', // 优惠券种类
        couponStock: 9999, // 优惠券数量
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
        workingDays: '', // 生效时间
        ImageId: ''

      },
      rules: {
        couponName: [
          {required: true, message: '请输入优惠券名称', trigger: 'blur'},
          {min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        discountPrice: [
          {required: true, message: '请输入抵扣金额', trigger: 'blur'},
          {min: 0, max: 100, message: '', trigger: 'blur'}
        ],
        activityDurationStart: [
          {required: true, message: '请输入活动开始时间', trigger: 'blur'},
          {message: '', trigger: 'blur'}
        ],
        activityDurationEnd: [
          {required: true, message: '请输入活动结束时间', trigger: 'blur'},
          {message: '', trigger: 'blur'}
        ],
        couponType: [{required: true, message: '请选择优惠券类型', trigger: 'blur'}, {}]
      }
    }
  },
  methods: {
    getId () {
      // alert(this.$route.params.id)
      if (sessionStorage.getItem('businessid')) {
        this.form.bussinessId = sessionStorage.getItem('businessid')
      } else {
        console.log('未获取商家id')
      }
    },
    onSubmit (val) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            // val['bussinessId'] = $route.params.id  == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            val.isFlashsale = val.isFlashsale ? 1 : 0
            // alert('ee')
            val.activityDurationStart = new Date(val.activityDurationStart).getTime()
            val.activityDurationEnd = new Date(val.activityDurationEnd).getTime()
            val.useDurationStart = new Date(val.useDurationStart).getTime()
            val.useDurationEnd = new Date(val.useDurationEnd).getTime()
            val.useDurationStartTime = new Date(val.useDurationStartTime).getTime()
            val.useDurationEndTime = new Date(val.useDurationEndTime).getTime()
            // alert(val)
            saveCoupons(val).then((res) => {
              this.editLoading = false
              // NProgress.done();
              if (res.data.code === 0) {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '提交失败，请检查网络',
                  type: 'error'
                })
              }
            })
          }).catch(() => {

          })
        }
      })
    },
    checkTimer (form) {
      alert('timer')
      if (form.useDurationStart < form.useDurationEnd) {
        alert('消费结束时间不能早于开始时间')
      }
    },
    uploadSuccess (response, file) {
      console.log(response.data.image.imgUrl)
      this.form.couponIcon = response.data.image.imgUrl
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 5

      if (!(isJPG | isPNG)) {
        this.$message.error('上传图片只能是 JPG 或 PNG格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
        return false
      }
      return true
    }
  },
  watch: {},
  mounted () {
    this.getId()
  }
}

</script>
