import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '../views/404'
// import index from '../views/brand/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login,
      name: 'login',
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '*',
      component: NotFound,
      name: '',
      hidden: true
    }
  ]
})
