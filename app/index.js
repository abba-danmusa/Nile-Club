import { Redirect } from 'expo-router'

const isLoggedIn = false
export default function App() {
  if (isLoggedIn) {
    return <Redirect href='/home' />
  } else {
    return <Redirect href='/signin' />
  }
}