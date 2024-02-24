import React, { useState, useRef }  from 'react'
import { View, ScrollView, StyleSheet, Dimensions} from 'react-native'
import EmailForm from "../../components/signup/EmailForm"
import VerifyEmailForm from '../../components/signup/VerifyEmailForm'
import { useSignup } from '../../hooks/queries/useAuthentication'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import Loader from '../../components/Loader'
import { router } from "expo-router"
import PasswordForm from '../../components/signup/PasswordForm'
import AboutForm from '../../components/signup/AboutForm'

const SCREEN_WIDTH = Dimensions.get('window').width
const EMAIL_FORM_INDEX = 0
const VERIFICATION_CODE_FORM_INDEX = 1
const PASSWORD_FORM_INDEX = 2

export default function signup() {
  
  const [slideIndex, setSlideIndex] = useState(0)
  const scrollViewRef = useRef(null)

  const { mutate: sendVerificationCode, isPending} = useSignup()
  const { email } = useAuthStore()

  
  const submitEmailForm = () => {
    sendVerificationCode(
      { email },
      { 
        onSuccess: () => scrollToScreen(VERIFICATION_CODE_FORM_INDEX), 
        onError: error => routeUserToAppropriateScreen(error)
      }
    )
  }

  const routeUserToAppropriateScreen = error => {
    if (error.response?.status === 409) {
      scrollToScreen(VERIFICATION_CODE_FORM_INDEX)
    }
    if (error.response?.status === 408) {
      router.push('/signin')
    }
    if (error.response?.status === 403) {
      scrollToScreen(PASSWORD_FORM_INDEX)
    }
  }

  const scrollToScreen = (index) => {
    const nextPageOffset = index * SCREEN_WIDTH
    scrollViewRef.current.scrollTo({ x: nextPageOffset, animated: true })
    setSlideIndex(index)
  }

  const SLIDES = [
    {
      renderSlide: () => <EmailForm handleSubmit={submitEmailForm} />
    },
    {
      renderSlide: () => <VerifyEmailForm scrollToScreen={scrollToScreen}/>
    },
    {
      renderSlide: () => <PasswordForm scrollToScreen={scrollToScreen} />
    },
    {
      renderSlide: () => <AboutForm scrollToScreen={scrollToScreen} />
    }
  ]

  const CurrentSlideIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {
          SLIDES.map((slide, index) =>
            <View
              key={index}
              style={[
                styles.indicatorStyle,
                {
                  opacity: (slideIndex == index) ||
                    (slideIndex > index) ? 1 : .4
                }
              ]}
            />
          )
        }
      </View>
    )
  }

  const renderDifferentSlides = () => {
    return SLIDES.map((slide, index) => {
      return (
        <View
          key={index}
          style={styles.slideContainer}
        >
          { slide.renderSlide() }
          {/* { slide.submitButton() } */}
        </View>
      )
    })
  }

  return (
    <>
      
      {isPending && <Loader />}
      {CurrentSlideIndicator()}

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        scrollEnabled={false}
        onScroll={({ nativeEvent }) => {
          const offsetX = nativeEvent.contentOffset.x
          const index = Math.floor(offsetX / SCREEN_WIDTH)
          setSlideIndex(index)
        }}
      >
        {renderDifferentSlides()}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    alignSelf: 'center'
  },
  indicatorStyle: {
    width: 27,
    height: 6,
    backgroundColor: '#365486',
    borderRadius: 10
  },
  slideContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#FFF',
  },
})