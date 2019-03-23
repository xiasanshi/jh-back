<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" @submit.prevent="onSubmit"
             style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="商家名称" prop="bussinessName">
            <el-input v-model="form.bussinessName" ></el-input>
        </el-form-item>
        <el-form-item label="品牌名称">
            <el-input v-model="form.mallName"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="bussinessUserName">
            <el-input v-model="form.bussinessUserName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="bussinessPhone">
            <el-input v-model="form.bussinessPhone" :max-length="12" ></el-input>
        </el-form-item>
        <el-form-item label="店铺电话" prop="telephone">
            <el-input v-model="form.telephone"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址">
            <el-input v-model="form.bussinessAddress"></el-input>
        </el-form-item>
        <el-form-item label="地址链接">
            <el-input v-model="form.bussinessPosition"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
            <el-input v-model="form.bussinessIntroduce"></el-input>
        </el-form-item>
        <el-form-item  label="商家logo">
            <el-upload
                class="upload-demo"
                action="http://wx.qingzhao.net.cn/fanZone/common/saveImage"
                :on-preview="handlePreview"
                :on-success="uploadSuccess"
                :file-list="fileList2"
                name="file"
                :limit="3"
                :before-upload="beforeAvatarUpload"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item style="text-align: center"><p><b>--其他信息--</b></p></el-form-item>
        <el-form-item label="小程序名称">
            <el-input v-model="form.bussinessWechatName"></el-input>
        </el-form-item>
        <el-form-item label="公众号链接">
            <el-input v-model="form.bussinessWechatUrl"></el-input>
        </el-form-item>
        <el-form-item label="会员链接">
            <el-input v-model="form.memberUrl"></el-input>
        </el-form-item>
        <el-form-item label="排队链接">
            <el-input v-model="form.queueUrl"></el-input>
        </el-form-item>
        <el-form-item label="外卖链接">
            <el-input v-model="form.takeoutUrl"></el-input>
        </el-form-item>
        <el-form-item label="预定链接">
            <el-input v-model="form.reserveUrl"></el-input>
        </el-form-item>
        <el-form-item label="点餐链接">
            <el-input v-model="form.orderUrl"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="submitForm('form',form)">立即创建</el-button>
            <!--<el-button @click.native.prevent>取消</el-button>-->
        </el-form-item>
    </el-form>

</template>

<script>
import {saveBusiness} from '../../api/api'

export default {
  name: 'create',
  data () {
    return {
      form: {
        bussinessCode: '', // shangjia
        bussinessName: '',
        bussinessUserName: '',
        bussinessProduct: '',
        bussinessCategory: '', // 商家种类0
        bussinessRank: '', // 业态（火锅，中式，日式）
        openid: '',
        bussinessAddress: '', // 商家地址
        bussinessPhone: '', // 联系人电话
        bussinessPosition: '', // 商家位置
        bussinessIntroduce: '', // 商家介绍
        bussinessIcon: '', // 商家logo
        telephone: '', // 店铺座机
        bussinessWechatUrl: '', // 公众号url
        bussinessWechatName: '', // 公众号名称
        memberUrl: '', // 会员url
        queueUrl: '', // 排队
        takeoutUrl: '', // 外卖
        orderUrl: '', // 点餐
        reserveUrl: '', // 预定
        ImageId: '',
        mallName: ''
      },
      fileList2: [],
      rules: {
        bussinessName: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        bussinessUserName: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 0, max: 100, message: '', trigger: 'blur' }
        ],
        bussinessPhone: [
          { required: true, message: '请输入联系人手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '', trigger: 'blur' }
        ],
        telephone: [
          { required: true, message: '请输入店铺电话', trigger: 'blur' },
          { min: 0, max: 12, message: '', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm (formName, form) {
      // alert(this.$refs[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.onSubmit(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getBusiness () {
      alert('dd')
    },
    onSubmit (val) {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        // NProgress.start();
        // let para = Object.assign({}, this.form);
        // alert(val.bussinessAddress);
        // let para = {'bussinessForm': val}
        saveBusiness(val).then((res) => {
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

        /* for(var i in para){
                        alert(para[i])
                    } */
        // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
      }).catch(() => {

      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadSuccess (response, file) {
      console.log(response.data.image.imgUrl)
      this.form.bussinessIcon = response.data.image.imgUrl
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
  }
}

</script>
