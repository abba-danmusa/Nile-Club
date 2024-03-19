import { Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const isLoggedIn = AsyncStorage.getItem('token')
  if (isLoggedIn) {
    return <Redirect href='/home' />
  } else {
    return <Redirect href='/welcome' />
  }
}