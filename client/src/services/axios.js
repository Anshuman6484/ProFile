import axios from 'axios'

const URL = 'http://localhost:3000/api' || 'https://resume-enhancer-jskd.onrender.com'

const instance = axios.create({
  baseURL: URL,
})

export default instance
