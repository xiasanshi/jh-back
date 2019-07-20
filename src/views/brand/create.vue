<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px" @submit.prevent="onSubmit"
             style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="品牌名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="principal">
            <el-input v-model="form.principal"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model="form.phone" :max-length="12" ></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="telephone">
            <el-input v-model="form.classfy"></el-input>
        </el-form-item>
        <el-form-item label="商家介绍">
            <div class="content">
                <vue-html5-editor :content="content" :height="400"
                                  @change="updateData"></vue-html5-editor>

            </div>
        </el-form-item>
        <el-form-item  label="商家logo">
            <el-upload
                class="upload-demo"
                action="http://192.168.71.134:5000/v1/image/upload"
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

        <el-form-item>
            <el-button type="primary" @click="submitForm('form',form)">立即创建</el-button>
            <!--<el-button @click.native.prevent>取消</el-button>-->
        </el-form-item>
    </el-form>

</template>

<script>

export default {
  name: 'create',
  data () {
    return {
      editLoading: false,
      content: '',
      fileList2: [],
      form: {
        name: '', // 品牌名称
        desc: '', // 描述
        icon: '', // logo
        images: '', // 品牌宣传图
        classfy: '', // 业态
        principal: '', // 联系人
        phone: '' // 联系电话
      },
      rules: {
        name: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
          { min: 0, max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        principal: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 0, max: 100, message: '', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系人手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    updateData (e) {
      console.log(e)
      this.form.desc = e
    },
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
    handlePreview () {},
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    onSubmit (val) {
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        this.editLoading = true
        let t = this.$Request
        t.setResource('brand')
        t.add(val).then((res) => {
          this.editLoading = false

          // NProgress.done();
          if (res.data.code === 200) {
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

        this.editLoading = false
      }).catch(() => {
        this.editLoading = false
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    uploadSuccess (response, file) {
      console.log(response)
      this.form.icon = response.data.id
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
