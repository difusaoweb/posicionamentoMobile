import axios from 'axios'

const baseURL = `${process.env.API_URL}:${process.env.API_PORT}/v${process.env.API_VERSION}`

const api = axios.create({
  baseURL: baseURL,
  headers: { 'Access-Control-Allow-Origin': '*' }
})

export default api
