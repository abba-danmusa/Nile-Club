import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { router } from "expo-router"

const profile = () => {
  const signout = () => {
    router.replace('signin')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={signout}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default profile