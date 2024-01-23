import React from 'react'
import { StatusBar, StyleSheet, Text, View, Dimensions} from 'react-native'
import Slides from '../../components/Slides'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { Button } from '@rneui/themed'

const SCREEN_WIDTH = Dimensions.get('window').width

const SLIDES_DATA = [
  {
    color: '#F2F9FB',
    asset: require('../../assets/welcome/1.png'),
    title: 'Join clubs effortlessly',
    description: 'Explore what a club has to offer and become a member', 
  },
  {
    color: '#FFF',
    asset: require('../../assets/welcome/2.png'),
    title: 'Always in the know',
    description: 'Stay informed about everything going on in your club',
  },
  {
    color: '#FFF',
    asset: require('../../assets/welcome/3.png'),
    title: 'Made for students',
    description: 'Enjoy a seamless and transparent user experience made for you',
  }
]

const Welcome = () => {

  return (
    <>
      <StatusBar style="auto" hidden />
      <Slides data={SLIDES_DATA} renderSlide={renderSlide}/>
    </>
  )
}

const renderSlide = () => {
  
  const navigateToSignup = () => {
    router.replace('/signup')
  }

  return SLIDES_DATA.map((slide, index) => {
    
    const adjustFirstImageHeight = { height: index == 0 ? 209 : 281 }

    return (
      <View
        key={index}
        style={[styles.slideContainer, { backgroundColor: slide.color }]}
      >
        <Image
          source={slide.asset}
          style={[styles.imageStyle, adjustFirstImageHeight]}
        />
        <Text style={styles.titleStyle}>{slide.title}</Text>
        <Text style={styles.descriptionStyle}>{slide.description}</Text>
        <Button
          title={'Get Started'}
          containerStyle={styles.buttonContainer}
          onPress={navigateToSignup}
        />
      </View>
    )
  })
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F2F9FB',
    alignItems: 'center'
  },
  imageStyle: {
    width: 373,
    height: 281
  },
  titleStyle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '500',
    color: '#365486',
    marginTop: 71,
    marginBottom: 10
  },
  descriptionStyle: {
    fontFamily: 'Poppins-Black',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#252427',
    textAlign: 'center',
    width: 285
  },
  buttonContainer: {
    marginTop: 89,
    position: 'absolute',
    bottom: 20,
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    backgroundColor: '#365486'
  },
})

export default Welcome