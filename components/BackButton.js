import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { getStatusBarHeight } from '../utils/methods'

const STATUS_BAR_HEIGHT = getStatusBarHeight()

export default function BackButton({
  handlePress = () => { },
  color = '#7FC7D9',
  iconColor = 'black'
}) {
  
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]} onPress={handlePress}>
      <Entypo name="chevron-thin-left" size={20} color={iconColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    top: STATUS_BAR_HEIGHT + 7,
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
})