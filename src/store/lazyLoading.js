// 懒加载组件
function lazy (name) {
  if (name.indexOf('_') !== -1) {
    let path = name.split('_')[0]
    let vuename = name.split('_')[1]
    // return () => import(`@/views/${file}/${name}.vue`)
    return () => import(`@/views/${path}/${vuename}.vue`)
  } else {
    return () => import(`@/views/${name}.vue`)
  }
}

export {lazy}
