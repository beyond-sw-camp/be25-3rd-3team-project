const DEFAULT_API_BASE_URL = 'http://100.119.201.17:9000'

// 프론트는 개별 서비스가 아니라 Gateway 하나만 바라봅니다.
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '')

// JWT가 HttpOnly 쿠키(token)로 내려오므로, 브라우저가 쿠키를 함께 보내도록 설정합니다.
const credentials = import.meta.env.VITE_API_CREDENTIALS || 'include'

// 절대 URL이 아니면 Gateway base URL을 붙입니다.
const buildUrl = (path) => {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${apiBaseUrl}/${path.replace(/^\//, '')}`
}

// 응답 형식에 맞춰 JSON 또는 text로 파싱합니다.
const parseResponseBody = async (response) => {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}

// 객체 body는 JSON으로 변환하고, FormData/URLSearchParams는 원본 형식을 유지합니다.
const createRequestBody = (body, headers) => {
  if (!body || body instanceof FormData || body instanceof URLSearchParams || typeof body === 'string') {
    return body
  }

  headers.set('Content-Type', 'application/json')
  return JSON.stringify(body)
}

export class ApiError extends Error {
  constructor(message, { status, data }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export const apiClient = async (path, options = {}) => {
  const { body, headers: customHeaders, ...fetchOptions } = options
  const headers = new Headers(customHeaders)

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json')
  }

  const response = await fetch(buildUrl(path), {
    ...fetchOptions,
    credentials,
    headers,
    body: createRequestBody(body, headers),
  })

  const data = await parseResponseBody(response)

  if (!response.ok) {
    throw new ApiError('API request failed', {
      status: response.status,
      data,
    })
  }

  return data
}

// 화면에서는 HTTP 메서드별 helper를 사용해 반복 코드를 줄입니다.
export const api = {
  get(path, options) {
    return apiClient(path, { ...options, method: 'GET' })
  },

  post(path, body, options) {
    return apiClient(path, { ...options, method: 'POST', body })
  },

  put(path, body, options) {
    return apiClient(path, { ...options, method: 'PUT', body })
  },

  patch(path, body, options) {
    return apiClient(path, { ...options, method: 'PATCH', body })
  },

  delete(path, options) {
    return apiClient(path, { ...options, method: 'DELETE' })
  },
}
