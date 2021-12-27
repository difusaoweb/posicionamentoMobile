import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.105:3333/v1/',
  // baseURL: 'http://127.0.0.1:3333/v1/',
  headers: {'Access-Control-Allow-Origin': '*'}
})

export default api
