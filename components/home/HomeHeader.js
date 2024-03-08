import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { SHADOW } from "../../utils/styles"
import { Image } from 'expo-image'
import { router } from "expo-router"

const HomeHeader = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/profile')} style={styles.avatarContainer}>
        <Image
          source={require('../../assets/home/avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Hello Mimi!</Text>
        <Text style={styles.message}>Let’s see what your clubs are up to!</Text>
      </View>
      <TouchableOpacity style={styles.notificationContainer}>
        <AntDesign name="bells" size={24} color="#EBEEF3" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEEF3',
    height: 'fit-content',
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW
  },
  avatarContainer: {
    alignItems: 'center',
    backgroundColor: '#EBEEF3',
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    contentFit: 'contain',
    borderRadius: 100,
  },
  avatarText: {
    fontSize: 26,
    color: '#365486',
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '500',
  },
  message: {
    fontFamily: 'Poppins',
    fontSize: 11,
    lineHeight: 11,
    color: 'black',
    width: 150,
  },
  notificationContainer: {
    backgroundColor: '#365486',
    width: 50, 
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW
  },
})

export default HomeHeader