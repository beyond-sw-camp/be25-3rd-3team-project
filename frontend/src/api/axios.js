import axios from 'axios'

const DEFAULT_API_BASE_URL = 'http://100.119.201.17:9000'
const DEFAULT_DEV_API_BASE_URL = '/gateway'

const defaultApiBaseUrl = import.meta.env.DEV ? DEFAULT_DEV_API_BASE_URL : DEFAULT_API_BASE_URL
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, '')
const withCredentials = import.meta.env.VITE_API_WITH_CREDENTIALS !== 'false'

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials,
  headers: {
    Accept: 'application/json',
  },
})

export default api
