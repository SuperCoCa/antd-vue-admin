import axios from 'axios'
import { getToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
})

service.interceptors.request.use(config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }

  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default service