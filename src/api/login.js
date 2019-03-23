import axios from 'axios'
import qs from 'qs'
import {url} from '../conf/url'

export const loginByUsername = params => {
  return axios.post(`${url}/login`, qs.stringify(params))
}

export const lgout = params => {
  return axios.get(`${url}/lgout`, params)
}

export const getUserInfo = params => {
  return axios.get(`${url}/login`, params)
}
