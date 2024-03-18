import { Animated, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { SHADOW } from '../utils/styles'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { useAnimationStore } from '../hooks/stores/useAnimationStore'

const DEVICE_HEIGHT = Dimensions.get('window').height
const BUTTON_HEIGHT = 50

export default function AddEventButton() {
  
  const { translateY } = useAnimationStore()
  const addEventButtonTranslateY = Animated
    .diffClamp(
      translateY, 0, 110
    )
    .interpolate({
      inputRange: [0, 200],
      outputRange: [0, DEVICE_HEIGHT + 110],
      extrapolate: 'clamp'
    })

  return (
    <Animated.View
      style={[
        styles.addButton,
        { transform: [{ translateY: addEventButtonTranslateY }] },
      ]}
    >
      <TouchableOpacity onPress={() => router.push('/event')}>
        <AntDesign name='plus' size={24} color='#fff' />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 10,
    zIndex: 1000,
    bottom: 110,
    width: 50,
    height: BUTTON_HEIGHT,
    borderRadius: 100,
    backgroundColor: '#365486',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1000,
    ...SHADOW
  }
})