 import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Stack, Redirect } from 'expo-router';

const queryClient = new QueryClient()

const isLoggedIn = false
export default function App() {
  if (isLoggedIn) {
    return <Redirect href='/home' />
  } else {
    return <Redirect href='/signin' />
  }
}