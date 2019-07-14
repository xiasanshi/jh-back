import * as api from './api'
import axios from 'axios'

export default api

// axios 配置
axios.defaults.timeout = 8000
// axios.defaults.baseURL = 'https://api.github.com'

export class Request {
    url = 'http://192.168.71.134:5000/'

    constructor (url) {
      this.url = url
    }

    setResource (resource) {
      this.resource = resource
    }

    getDetail (params) {
      return axios.get(`${this.url}/${this.resource}/${params['id']}`, params)
    }

    add (params) {
      return axios.post(`${this.url}/${this.resource}`, params)
    }

    update (params) {
      return axios.put(`${this.url}/${this.resource}`, params)
    }

    delete (params) {
      return axios.delete(`${this.url}/${this.resource}/${params['id']}`, params)
    }

    getList (params) {
      return axios.post(`${this.url}/${this.resource}/list`, params)
    }
}
