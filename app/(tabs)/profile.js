import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { router } from "expo-router"

const profile = () => {
  const signout = () => {
    router.replace('signin')
  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={signout}>
        <Text>Sign Out</Text>  
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default profile