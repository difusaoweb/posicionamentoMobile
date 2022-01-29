import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.0.105:3333/v1/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  // timeout: 60*60*1000
})

export default api
