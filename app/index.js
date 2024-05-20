import { Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { socket } from '../socket.io/socket'
import { useEffect, useState } from 'react'
import { useChats } from '../hooks/queries/useChat';
import { useUser } from '../hooks/queries/useAuthentication';

export default function App() {
  
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState('N/A');
  const [isLoggedIn, setIsLoggedIn] = useState('')

  // useEffect(() => {

  //   if (socket.connected) {
  //     onConnect();
  //   }

  //   function onConnect() {
  //     setIsConnected(true);
  //     setTransport(socket.connected);

  //     socket.io.engine.on('upgrade', (transport) => {
  //       setTransport(transport.name);
  //     })
  //   }

  //   function onDisconnect() {
  //     console.log('socket disconnected')
  //     setIsConnected(false);
  //     setTransport('N/A');
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //   };
  // }, [])

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLoggedIn(token);
    }

    checkLoggedIn();
  }, [])
  // console.log(socket.connected)
  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return null
  }
  
  if (isLoggedIn && isConnected) {
    // socket.io takes over from here
    
  }

  if (isLoggedIn) {
    socket.on('disconnect', () => console.log('Socket Disconnected'))
    socket.on('connect', () => socket.emit('join room'))

    return (
      <SafeAreaView >
        <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content" />
        <Redirect href='/home' />
      </SafeAreaView>
    )
  } else {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor={'#EBEEF3'} barStyle="dark-content" />
        <Redirect href='/welcome' />
      </SafeAreaView>
    )
  }
}