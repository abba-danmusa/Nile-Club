import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { BLURHASH } from '../utils/styles'

export default function Avatar({
  image = require('../assets/home/avatar.png'),
  width = 68,
  height = 68,
  borderWidth = 1.5,
}) {
  return (
    <View style={[styles.container, {width, height, borderWidth}]}>
      <Image
        source={image}
        placeholder={BLURHASH}
        contentFit='cover'
        style={{width: width - 6, height: height - 6, borderRadius: 100}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    
    borderColor: '#365486',
    alignItems: 'center',
    justifyContent: 'center',
  }
})