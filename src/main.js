// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router/index'
import './assets/element-#26A2FF/index.css'
import './assets/font_702598_vzrrja5y3qd/iconfont.css'
import ElementUI from 'element-ui'
import {Request} from './api/index'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios/index'


Vue.use(VueRouter)
Vue.config.productionTip = true
Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(VueRouter)
let resq = new Request('http://192.168.71.134:5000/v1')
Vue.prototype.$Request = resq
// Vue.prototype.$cmt = cmt
sessionStorage.setItem('businessId', 'FWRXB0000001')
if (sessionStorage.getItem('user')) {
  store.dispatch('add_Routes', JSON.parse(sessionStorage.getItem('routes')))
}
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('token')) { // 判断token是否存在
      config.headers.Authorization = 'JWT#' + sessionStorage.getItem('token') // 将token设置成请求头
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      // router.replace('/')
      console.log('token过期')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
router.beforeEach((to, from, next) => {
  console.log('main:' + next.name)
  // if (to.path === '/login') {
  //   sessionStorage.removeItem('user')
  // }
  if (!sessionStorage.getItem('token') && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})
/* eslint-disable no-new */

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
