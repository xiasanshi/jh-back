import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.use(axios)
// let url = 'http://test.fanzone.vip:8081/fanZone'
let urlApi = '/api'
let base = ''
export const requestLogin = params => {
  return axios.post(`${urlApi}/login`, qs.stringify(params))
}

export class User {
  getAllPerm (params) {
    return axios.post(`${urlApi}/permission/get`, params)
  }
  createRole (params) {
    return axios.post(`${urlApi}/role/create`, params)
  }
  getRole (params) {
    return axios.post(`${urlApi}/role/get/company`, params)
  }
  createUser (params) {
    return axios.post(`${urlApi}/user/create`, params)
  }
  updateUser (params) {
    return axios.post(`${urlApi}/user/edit`, params)
  }
}

export class Stat {
    url = 'http://wx.qingzhao.net.cn/fanZone';
    getBusinessStat (params) {
      return axios.post(`${this.url}/seller/checkBill`, params)
    }
}

let url = 'http://wx.qingzhao.net.cn'

export const Login = params => {
  return axios.get(`${url}/fanZone/sysUser/login`, {params: params})
}

export const getUserList = params => {
  return axios.get(`${base}/user/list`, {params: params})
}

export const getUserListPage = params => {
  return axios.post(`${url}/fanZone/buyer/userInfo/findUsers`, params)
}

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, {params: params})
}

export const batchRemoveUser = params => {
  return axios.get(`${base}/user/batchremove`, {params: params})
}

export const editUser = params => {
  return axios.get(`${base}/user/edit`, {params: params})
}

export const addUser = params => {
  return axios.get(`${base}/user/add`, {params: params})
}

export const getAllBusiness = params => {
  return Vue.http.get(`${url}/fanZone/seller/bussiness/list`, {params: params})
  // return axios.get(`http://wx.qingzhao.net.cn/fanZone/seller/bussiness/list?bussinessStatus=1`, {params: params})
}

export const getAllCoupons = params => {
  // alert("sssssssssssshhh");
  console.log(`${url}/fanZone/seller/coupon/list`)
  return axios.get(`${url}/fanZone/seller/coupon/list`, {params: params})
}

export const getAllDynamic = params => {
  // alert("ss");
  // console.log(`${url}/fanZone/seller/coupon/list`)
  return axios.get(`${url}/fanZone/buyer/dynamic/list`, {params: params})
}

export const getAllConvenientInfo = params => {
  return axios.get(`http://wx.qingzhao.net.cn/fanZone/seller/convenientInfo/list?status=1`, {params: params})
  // return axios.get(`http://wx.qingzhao.net.cn/fanZone/seller/convenientInfo/list`, {params: params})
}

export const getSalesVolume = params => {
  // alert('ss')
  return axios.get(`http://wx.qingzhao.net.cn/fanZone/seller/balance/find`, {params: params})
}

export const destoonFinanceCash = params => {
  // alert('ss')
  return axios.get(`wx.qingzhao.net/fanZone/seller/balance/find`, {params: params})
}

export const removeBusiness = params => {
  return axios.get(`${url}/fanZone/seller/bussiness/close`, {params: params})
}

export const removeCoupon = params => {
  return axios.get(`${url}/fanZone/seller/coupon/off_sale`, {params: params})
}

export const removeDynamic = params => {
  return axios.get(`${url}/fanZone/buyer/dynamic/off_sale`, {params: params})
}

export const removeConvenient = params => {
  return axios.get(`${url}/fanZone/buyer/convenientInfo/check`, {params: params})
}

export const queryBusiness = params => {
  return axios.get(`${url}/fanZone/seller/bussiness/list`, {params: params})
}

export const saveBusiness = params => {
  // alert(params.bussinessForm.bussinessWechatName)
  // return Vue.http.post(`${url}/fanZone/seller/bussiness/save`, {params:params})
  return axios.post(`${url}/fanZone/seller/bussiness/save`, params)
}

export const createCoupon = params => {
  return axios.post(`${url}/fanZone/seller/bussiness/save`, {params: params})
}

export const saveCoupons = params => {
  return axios.post(`${url}/fanZone/seller/coupon/save`, params)
}

export const createConvenientInfo = params => {
  // var t = qs.stringify(params)
  // console.log(params.convi)
  // return Vue.http.post(`${url}/fanZone/buyer/convenientInfo/save`, {params:params,emulateJSON : true})
  return axios.post(`${url}/fanZone/seller/convenientInfo/save`, params)
  // return xl.post(`${url}/fanZone/buyer/convenientInfo/save`,params)
}

export const createDynamic = params => {
  // var t = qs.stringify(params)
  // console.log(params.convi)
  // return Vue.http.post(`${url}/fanZone/buyer/convenientInfo/save`, {params:params,emulateJSON : true})
  return axios.post(`${url}/fanZone/buyer/dynamic/save`, params)
  // return xl.post(`${url}/fanZone/buyer/convenientInfo/save`,params)
}

export const saveImage = params => {
  return axios.post(`${url}/fanZone/common/saveImage`, {params: params})
}

export const checkBussiness = params => {
  return axios.get(`${url}/fanZone/seller/bussiness/check`, {params: params})
}

export const checkPendingConvenientInfo = params => {
  return axios.get(`${url}/fanZone/buyer/convenientInfo/list?status=0`, {params: params})
}

// 商家入驻审核
export const checkPendingBusiness = params => {
  return axios.get(`${url}/fanZone/buyer/shopApply/list`, {params: params})
}

export const checkShopApplyPass = params => {
  return axios.get(`${url}/fanZone/buyer/shopApply/check`, {params: params})
}

export const checkConvenientInfo = params => {
  // alert(params.convenientId)
  return axios.get(`${url}/fanZone/buyer/convenientInfo/check`, {params: params})
}

export const getSellerUserCoupon = params => {
  return axios.get(`${url}/fanZone/buyer/userCoupon/findByBusiness`, {params: params})
}

export const getBusinessStat = params => {
  return axios.post(`${url}/fanZone/seller/checkBill`, params)
}

export class PinTuan {
    url = 'https://pintuan.fanzone.vip/pintuanrs/'

    // url = '/api'
    createGrouponByBusinessId (params) {
      // console.log('sssssssssss')
      console.log(params)
      return axios.post(`${this.url}groupon/create`, params)
    }
}
