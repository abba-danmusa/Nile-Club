import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import BottomButton from '../BottomButton'
import { Image } from 'expo-image'

const SCREEN_WIDTH = Dimensions.get('window').width
const PASSWORD_FORM_INDEX = 2

const CodeConfirmed = ({ scrollToPasswordForm }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/signup/check_mark.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Email Verified</Text>
      <Text style={styles.description}>Your email has been verified</Text>
      <BottomButton
        title={'Proceed'}
        backgroundColor={'#fff'}
        color={'#365486'}
        handlePress={scrollToPasswordForm}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#365486',
    zIndex: 100,
  },
  image: {
    width: 180,
    height: 160,
    marginBottom: 28,
  },
  title: {
    color: '#EBEEF3',
    fontSize: 30,
    marginBottom: 6,
  },
  description: {
    color: '#EBEEF3',
    fontSize: 16,
    textAlign: 'center',
  }
})

export default CodeConfirmed