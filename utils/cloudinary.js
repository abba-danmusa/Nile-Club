import axios from 'axios'

const instance = axios.create({
  baseURL: EXPO_PUBLIC_CLOUDINARY_BASE_URL
})

export default instance