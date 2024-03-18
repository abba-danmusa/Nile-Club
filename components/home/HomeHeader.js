import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { SHADOW } from "../../utils/styles"
import { Image } from 'expo-image'
import { router } from "expo-router"
import { useAnimationStore } from '../../hooks/stores/useAnimationStore'
import getStatusBarHeight from '../../utils/StatusBarHeight'

const HomeHeader = () => {
  
  const STATUS_BAR_HEIGHT = getStatusBarHeight()

  const { translateY } = useAnimationStore()
  const headerTranslateY = Animated
    .diffClamp(translateY, 0, 50 + STATUS_BAR_HEIGHT)
    .interpolate({
      inputRange: [0, 50 + STATUS_BAR_HEIGHT],
      outputRange: [0, -50 + (-STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp'
    })

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: headerTranslateY }],
          height: 50 + STATUS_BAR_HEIGHT * 1.5,
          paddingTop: STATUS_BAR_HEIGHT * 1.5,
        }
      ]}
    >
      <TouchableOpacity
        onPress={() => router.push('/profile')}
        style={styles.avatarContainer}
      >
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
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEEF3',
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
    height: 40,
    width: 40,
    borderRadius: 100,
    borderColor: '#58719B',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 100,
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
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  message: {
    fontFamily: 'Poppins',
    fontSize: 10,
    lineHeight: 11,
    color: 'black',
    width: 150,
  },
  notificationContainer: {
    backgroundColor: '#365486',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW
  },
})

export default HomeHeader