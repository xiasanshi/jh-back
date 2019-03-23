export const compMap = params => {
  return {
    'ROLE_brand_index': {
      'fname': null,
      'father': 'ROLE_brand',
      'title': 'brand',
      'name': '首页',
      'path': '/index',
      'component': 'brand_index',
      'hidden': false,
      'iconCls': 'iconfont icon-shouye'
    },
    'ROLE_brand_update': {
      'fname': null,
      'father': 'ROLE_brand',
      'title': 'brand',
      'name': '品牌信息修改',
      'path': '/brand/update',
      'component': 'brand_update',
      'hidden': false,
      'iconCls': 'iconfont icon-shouye'
    },
    'ROLE_brand_list': {
      'fname': '商家',
      'father': 'ROLE_brand',
      'title': 'brand',
      'name': '店铺列表',
      'path': '/brand',
      'component': 'brand_list',
      'hidden': false,
      'iconCls': 'iconfont icon-fendianfffpx'
    },
    'ROLE_brand_create': {
      'fname': '商家',
      'father': 'ROLE_brand',
      'title': 'brand create',
      'name': '创建店铺',
      'path': '/brand/create',
      'component': 'brand_create',
      'hidden': false,
      'iconCls': 'iconfont icon-ruzhuchenggongdapx'
    },
    'ROLE_user_list': {
      'fname': '用户',
      'father': 'ROLE_brand',
      'title': 'user',
      'name': '用户列表',
      'path': '/user',
      'component': 'user_list',
      'hidden': false,
      'iconCls': 'iconfont icon-huiyuanguanlipx'
    },
    'ROLE_coupon_list': {
      'fname': '优惠券',
      'father': 'ROLE_brand',
      'title': 'coupon',
      'name': '优惠券列表',
      'path': '/coupon',
      'component': 'coupon_list',
      'hidden': false,
      'iconCls': 'iconfont icon-huiyuanguanlipx'
    },
    'ROLE_coupon_create': {
      'fname': '优惠券',
      'father': 'ROLE_brand',
      'title': 'coupon',
      'name': '创建优惠券',
      'path': '/coupon/create',
      'component': 'coupon_create',
      'hidden': false,
      'iconCls': 'iconfont icon-huiyuanguanlipx'
    },
    'ROLE_create_role': {
      'fname': '角色',
      'father': 'ROLE_brand',
      'title': 'premission',
      'name': '创建角色',
      'path': '/premission/create',
      'component': 'premission_create',
      'hidden': false,
      'iconCls': 'iconfont icon-huiyuanguanlipx'
    },
    'ROLE_brand': {
      'fname': '',
      'father': null,
      'title': 'home',
      'name': '',
      'path': '/',
      'component': 'Home',
      'iconCls': 'fa fa-address-card'
    }
  }
}
