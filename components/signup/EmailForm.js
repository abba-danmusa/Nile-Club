import { View, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Dimensions} from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import BottomButton from '../../components/BottomButton'
import toast from '../../utils/toast'
import CustomizedInput from '../CustomizedInput'

const SLIDE_DATA = {
  color: '#F2F9FB',
  asset: require('../../assets/signup/1.png'),
  title: 'Create an account',
  description: 'We\'ll send a verification link to this email address. This is to make sure this is really your email.',
}
const DEVICE_WIDTH = Dimensions.get('window').width
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

const EmailVerificationForm = ({handleSubmit}) => {
  const {email, setEmail} = useAuthStore()

  const sendVerificationCode = () => {
    if (!email || email == '') {
      return toast('Please enter your email address')
    }
    handleSubmit()
  }

  return (
    <KeyboardAvoidingView
      behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={SLIDE_DATA.asset}
        PlaceholderContent={<ActivityIndicator />}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      <Text style={styles.title}>{SLIDE_DATA.title}</Text>
      <Text style={styles.description}>{SLIDE_DATA.description}</Text>
      <CustomizedInput
        focusable={true}
        placeholder='Enter your email address'
        label='Email'
        onChangeText={setEmail}
        value={email}
        autoComplete='email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        style={styles.input}
        labelStyle={styles.inputLabel}
        containerStyle={styles.inputMainContainer}
        inputContainerStyle={styles.inputContainer}
      />
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have a account?</Text>
        <Link href={'/signin'} style={styles.signupLink}>Sign in</Link>
      </View>
      <BottomButton title={'Proceed'} handlePress={sendVerificationCode} />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
  image: {
    width: 212,
    height: 110,
  },
  title: {
    fontSize: 30,
    fontWeight: 400,
    color: '#000',
    fontFamily: 'Poppins',
    paddingTop: 20,
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins',
    paddingBottom: 20,
    alignSelf: 'flex-start',
  },
  inputMainContainer: {
    alignItems: 'flex-start',
    width: DEVICE_WIDTH - 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    display: 'flex',
    alignSelf: 'flex-start',
  },
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#252427',
  },
  input: {
    marginTop: 10,
    fontFamily: 'Poppins',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#263B5E',
    borderRadius: 12,
    height: 50,
    alignSelf: 'flex-start',
  },
  signupContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  signupText: {
    fontSize: 14,
    color: '#252427',
    fontFamily: 'Poppins',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  signupLink: {
    fontSize: 14,
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginLeft: 5,
    textDecorationLine: 'underline',
  }
})

export default EmailVerificationForm