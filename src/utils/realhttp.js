import Vue from 'vue'
import store from '@/store'
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import { Modal, message } from 'ant-design-vue'
import { VueAxios } from './axios'
import { ACCESS_TOKEN, USER_NAME } from '@/store/mutation-types'
import { deepToHump, deepToLine } from './util'
import { tokenExpiredTime } from '@/config/systemConfig'
import { getInfo } from '@/api/login'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 20000 // 请求超时时间
})

const err = (error) => {
  return Promise.reject(error)
}

// 记录 用于token过期退出的 timeout
let logoutTimeoutMsg = null
let logoutTimeout = null

function setExpiredTimeout () {
  if (logoutTimeoutMsg) clearTimeout(logoutTimeoutMsg)
  if (logoutTimeout) clearTimeout(logoutTimeout)
  const tipTime = tokenExpiredTime - (1000 * 60)
  logoutTimeoutMsg = setTimeout(() => {
    Modal.confirm({
      title: '登录信息即将失效',
      content: '登录信息将在1分钟后失效，失效后会自动退出系统。如果需要更新登录信息，请点击确定按钮',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        getInfo().then(res => {
          message.success('更新成功')
        })
      }
    })
  }, tipTime)
  logoutTimeout = setTimeout(() => {
    store.dispatch('Logout')
  }, tokenExpiredTime)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  const name = Vue.ls.get(USER_NAME)
  if (token) {
    config.headers['x-session-token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers['x-login-name'] = name
  }
  if (config.data) {
    if (Object.prototype.toString.call(config.data) !== '[object FormData]') {
      config.data = deepToLine(config.data)
    }
  }
  return config
}, err)

let counts = 0
const errMsgs = ['用户登录信息失效,请重新登录']
// response interceptor
service.interceptors.response.use((response) => {
  const myHeader = response.data.header
  if (myHeader.code === 403) {
    notification.error({
      message: '无权访问',
      description: myHeader.msg,
      // duration: null,
      duration: 10
    })
    store.dispatch('Logout')
    return Promise.reject(response)
  }

  if (myHeader.code !== 0) {
    // 用户登录信息失效,请重新登录
    if (errMsgs.indexOf(myHeader.msg) > -1) {
      counts++
    }
    if (counts > 1) {
      // counts = 0
      return
    }
    notification.error({
      message: '服务出错',
      description: myHeader.msg,
      // duration: null,
      duration: 10
    })
    return Promise.reject(response)
  } else {
    const oldToken = Vue.ls.get(ACCESS_TOKEN)
    const newToken = response.headers['access-token']
    if (newToken && oldToken !== newToken) {
      Vue.ls.set(ACCESS_TOKEN, newToken)
      store.commit('SET_TOKEN', newToken)
      setExpiredTimeout()
    }
  }
  const data = deepToHump(response.data.body)

  return data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios,
  setExpiredTimeout
}
