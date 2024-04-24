import { io } from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN = AsyncStorage.getItem('token')

// export const socket = io('http://127.0.0.1:4040')
export const socket = io(process.env.EXPO_PUBLIC_NEXUS_CLUB_API_BASE_URL, {
  auth: async cb => {
    const token = await AsyncStorage.getItem('token')
    cb({
      token,
      serverOffset: 0,
    })
  }
})