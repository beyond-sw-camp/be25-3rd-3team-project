import axios from 'axios'

const DEFAULT_API_BASE_URL = 'http://100.119.201.17:9000'
const DEFAULT_DEV_API_BASE_URL = '/gateway'

// 프론트는 개별 서비스가 아니라 Gateway 하나만 바라봅니다.
// 개발 중에는 Vite proxy(/gateway)를 통해 CORS 설정이 없어도 Gateway 호출을 검증합니다.
const defaultApiBaseUrl = import.meta.env.DEV ? DEFAULT_DEV_API_BASE_URL : DEFAULT_API_BASE_URL
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, '')

// JWT가 HttpOnly 쿠키(token)로 내려오므로, 요청마다 쿠키가 함께 전송되도록 합니다.
const withCredentials = import.meta.env.VITE_API_WITH_CREDENTIALS !== 'false'

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials,
  headers: {
    Accept: 'application/json',
  },
})

export default api
