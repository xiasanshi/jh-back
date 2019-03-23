<template>
  <div
    style="width: 100%;height: 100%;/*background-image: url('http://pic.97uimg.com/back_pic/20/15/10/15/edd9d1f63ae157c386b9cb214c50045c.jpg')*/;position: absolute;top:0;left: 0">
    <el-form
      ref="ruleForm2"
      :model="ruleForm2"
      :rules="rules2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container">
      <h3 class="title">fanzone后台</h3>
      <el-form-item prop="account">
        <el-input v-model="ruleForm2.account" type="text" auto-complete="off" placeholder="账号"/>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input v-model="ruleForm2.checkPass" type="password" auto-complete="off" placeholder="密码"/>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="logining" type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录
        </el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { requestLogin } from '../api/api'
import { mapActions } from 'vuex'
// import NProgress from 'nprogress'
export default {
  data () {
    return {
      logining: false,
      ruleForm2: {
        account: '18721851150',
        checkPass: '111111'
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    }
  },
  methods: {
    ...mapActions({ add_Routes: 'add_Routes' }),
    handleReset2 () {
      this.$refs.ruleForm2.resetFields()
    },
    handleSubmit2 (ev) {
      // let _this = this
      // let routerData = ['/user']
      // this.add_Routes(routerData)
      // sessionStorage.setItem('user', 'id2')
      // return
      this.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          // _this.$router.replace('/table');
          this.logining = true
          // NProgress.start();
          var loginParams = { 'username': this.ruleForm2.account, 'password': this.ruleForm2.checkPass }
          requestLogin(loginParams).then((res) => {
            this.logining = false
            // this.$router.push({ path: '/allBusiness' });
            // NProgress.done();
            //   alert(res)
            // console.log(res)

            const code = res.data.code
            // alert(code)
            const msg = res.data.msg
            const user = res.data.data
            // let { code, msg, user } = res.body.data;
            if (code !== '2000') {
              this.$message({
                message: msg,
                type: 'error'
              })
            } else {
              sessionStorage.setItem('user', JSON.stringify(user))
              sessionStorage.setItem('routes', JSON.stringify(user))
              this.add_Routes(user)
              // this.$router.push({ path: '/brand' })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  .login-container {
    z-index: 999;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
