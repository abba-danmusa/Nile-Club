import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions} from 'react-native'
import React from 'react'
import Slides from '../../components/Slides'
import EmailVerificationForm from '../../components/signup/emailForm'

const SCREEN_WIDTH = Dimensions.get('window').width

const SLIDES_DATA = [
  {
    // color: '#F2F9FB',
    // asset: require('../../assets/welcome/1.png'),
    // title: 'Join clubs effortlessly',
    // description: 'Explore what a club has to offer and become a member',
    renderSlide: () => <EmailVerificationForm />
  },
  // {
  //   color: '#FFF',
  //   asset: require('../../assets/welcome/2.png'),
  //   title: 'Always in the know',
  //   description: 'Stay informed about everything going on in your club',
  // },
  // {
  //   color: '#FFF',
  //   asset: require('../../assets/welcome/3.png'),
  //   title: 'Made for students',
  //   description: 'Enjoy a seamless and transparent user experience made for you',
  // }
]

const signup = () => {
  return (
    <SafeAreaView>
      <StatusBar style="auto" hidden />
      <Slides renderSlide={renderSlides}/>
    </SafeAreaView>
  )
}

const renderSlides = () => {
  SLIDES_DATA.map((slide, index) => {
    const adjustFirstImageHeight = { height: index == 0 ? 209 : 281 }
    return (
      <View style={[styles.slideContainer, adjustFirstImageHeight]}>
        { slide.renderSlide() }
      </View>
    )
  })
  // return (
  //   <View style={styles.slideContainer}>
  //     <Text>hello world</Text>
  //   </View>
  // )
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
})

export default signup