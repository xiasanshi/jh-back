// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router/index'
import './assets/element-#26A2FF/index.css'
import './assets/font_702598_vzrrja5y3qd/iconfont.css'
import ElementUI from 'element-ui'
import api from './api'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = true
Vue.use(Vuex)
Vue.use(ElementUI)
// Vue.use(VueRouter)

Vue.prototype.$api = api
// Vue.prototype.$cmt = cmt
sessionStorage.setItem('businessId', 'FWRXB0000001')
if (sessionStorage.getItem('user')) {
  store.dispatch('add_Routes', JSON.parse(sessionStorage.getItem('routes')))
}

router.beforeEach((to, from, next) => {
  console.log('main:' + next.name)
  // if (to.path === '/login') {
  //   sessionStorage.removeItem('user')
  // }
  if (!sessionStorage.getItem('user') && to.path !== '/login') {
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
