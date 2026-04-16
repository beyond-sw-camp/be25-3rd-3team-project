import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchOrders = async () => {
  const { data } = await http.get('/orders')
  return data
}

export const fetchOrderManagement = async () => {
  const { data } = await http.get('/orders/management')
  return data
}

export const fetchFailedOrders = async () => {
  const { data } = await http.get('/orders/failed')
  return data
}

export const cancelOrder = async (orderId) => {
  const { data } = await http.patch(`/orders/${orderId}/cancel`)
  return data
}