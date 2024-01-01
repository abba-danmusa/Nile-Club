import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  // baseURL: 'https://9t396f1p-5555.euw.devtunnels.ms/'
  baseURL: 'https://2f6f-197-210-52-13.ngrok-free.app' 
})

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance