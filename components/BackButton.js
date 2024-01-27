import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function BackButton({handlePress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Entypo name="chevron-thin-left" size={20} color="black" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    top: 32,
    backgroundColor: '#7FC7D9',
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})