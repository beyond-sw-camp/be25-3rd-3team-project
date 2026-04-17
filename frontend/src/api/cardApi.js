import api from './axios'

/** Gateway가 `/cards`를 ORDER-PROCESSING-SERVICE 등으로 라우팅한다고 가정 */
export const getCards = () => api.get('/cards')

export const getCard = (id) => api.get(`/cards/${id}`)

export const postCard = (data) => api.post('/cards', data)

export const deleteCard = (id) => api.delete(`/cards/${id}`)

export const toggleCard = (id) => api.patch(`/cards/${id}/toggle`)

export const getCardDetail = (id) => api.get(`/cards/${id}/decrypt`)
