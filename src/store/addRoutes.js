import {ADD_ROUTES} from './mutations_type'
import Menufilter from './menufilter'
import router from '../router'

const addRoutes = {
  state: {
    routeData: []
  },
  mutations: {
    [ADD_ROUTES] (state, addrouter) {
      console.log('===========dddd')
      console.log(addrouter)
      let routes = []
      Menufilter(routes, addrouter) // 将后台的路由数据components转化成组件
      console.log(routes)
      sessionStorage.setItem('sliderList', JSON.stringify(routes))
      router.addRoutes(routes) // 添加路由
      console.log(router)
      console.log('ddd====')
      console.log(this.$router)
      router.push('/index')
    }
  },
  actions: {
    add_Routes ({commit}, addrouter) {
      commit(ADD_ROUTES, addrouter)
    }
  }
}
export default addRoutes
