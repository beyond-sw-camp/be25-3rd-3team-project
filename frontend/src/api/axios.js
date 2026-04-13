import axios from 'axios'

const api = axios.create({
    baseURL: 'http://100.119.201.17:9000',
    withCredentials: true
})

export default api