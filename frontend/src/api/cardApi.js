import axios from 'axios'

const api = axios.create({
  baseURL: '', // 상대경로 유지
})

/* 카드 전체 조회 */
export const getCards = () => api.get('/cards')

/* 카드 단건 조회 (🔥 추가) */
export const getCard = (id) => api.get(`/cards/${id}`)

/* 카드 등록 */
export const postCard = (data) => api.post('/cards', data)

/* 카드 삭제 */
export const deleteCard = (id) => api.delete(`/cards/${id}`)

/* 카드 활성/비활성 */
export const toggleCard = (id) => api.patch(`/cards/${id}/toggle`)

/* 카드 상세 (복호화) */
export const getCardDetail = (id) => api.get(`/cards/${id}/decrypt`)