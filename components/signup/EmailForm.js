import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { Input, Image } from '@rneui/themed'
import { useAuthStore } from '../../hooks/stores/useAuthStore'

const SLIDE_DATA = {
  color: '#F2F9FB',
  asset: require('../../assets/signup/1.png'),
  title: 'Create an account',
  description: 'We\'ll send a verification link to this email address. This is to make sure this is really your email.',
}

const EmailVerificationForm = () => {
  console.log('hello world')
  const {
    firstName,
    lastName,
    email,
    password,
    department,
    year,
    confirmPassword,
    setEmail,
    setPassword,
    setDepartment,
    setYear,
    setFirstName,
    setLastName,
    setConfirmPassword
  } = useAuthStore()

  return (
    <>
      <Image
        style={styles.image}
        source={SLIDE_DATA.asset}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Text style={styles.title}>{SLIDE_DATA.title}</Text>
      <Text style={styles.description}>{SLIDE_DATA.description}</Text>
      <Text>hello world</Text>
      <Input
        focusable={true}
        placeholder='Email'
        onChangeText={setEmail}
        value={email}
        autoComplete='email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        returnKeyType='next'
        style={styles.input}
      />
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 209,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'Inter-Bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter-Regular',
    paddingBottom: 20,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 5,
    height: 40,
  },
})

export default EmailVerificationForm