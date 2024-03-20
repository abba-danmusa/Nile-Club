import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_CLOUDINARY_BASE_URL
})

export default instance