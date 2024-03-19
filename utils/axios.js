import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  // baseURL: 'https://9t396f1p-5555.euw.devtunnels.ms/'
  baseURL: process.env.EXPO_PUBLIC_NEXUS_CLUB_API_BASE_URL
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