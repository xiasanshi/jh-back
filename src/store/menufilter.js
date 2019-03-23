/* eslint-disable camelcase */
import {lazy} from './lazyLoading'
// import Home from '../views/Home'
import {compMap} from '../conf/cmt'

var comp_map = compMap()
// console.log(comp_map)
export default (routers, data) => {
  // 要重新遍历一下，是因为，通常我们动态路由的时候，
  // 是获取服务端数据，这个component属性是一个字符串转化成组件
  generaMenu(routers, data)
}
// let routerss = {
//   path: '/',
//   component: Home,
//   name: '商家',
//   iconCls: 'el-icon-message',
//   children: []
// }

function generaMenu (routers, data) {
  console.log(comp_map)
  data.unshift('ROLE_brand_index')
  let routMap = new Map()
  data.forEach((data) => {
    console.log(comp_map[data])
    let rout = comp_map[data]
    let crouter = {
      path: rout.path,
      component: lazy(rout.component),
      name: rout.name,
      children: []
    }
    console.log(rout)
    if (rout.father && rout.father !== null) {
      if (routMap.has(rout.fname)) {
        routMap.get(rout.fname).leaf = false
        routMap.get(rout.fname).children.push(crouter)
      } else {
        let father = comp_map[rout.father]
        let mainrouter = {
          leaf: true,
          path: father.path,
          component: lazy(father.component),
          name: rout.fname,
          children: [],
          iconCls: rout.iconCls
        }
        mainrouter.children.push(crouter)
        console.log(mainrouter)
        routMap.set(rout.fname, mainrouter)
      }
    } else {
      routMap.set(rout.name, crouter)
    }
    console.log('ssss')
  })
  for (let val of routMap.values()) {
    console.log(val)
    routers.push(val)
  }
}
