import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RootSiblingParent } from 'react-native-root-siblings'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { socket } from '../socket.io/socket'

SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

export default function Layout() {
  
  // const [fontsLoaded] = useFonts({
  //   'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  // })
  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [fontsLoaded])

  // if (!fontsLoaded) {
  //   return null
  // }

  // const [isConnected, setIsConnected] = useState(false)
  // const [transport, setTransport] = useState('N/A')

  // useEffect(() => {
    
  // }, [])

  // console.log(isConnected ? 'connected' : 'disconnected', transport) 

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <RootSiblingParent>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name='(welcome)' />
            <Stack.Screen name='(authentication)'/>
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(club)' />
            <Stack.Screen name='profile' />
            <Stack.Screen name='chat' />
          </Stack>
        </RootSiblingParent>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}