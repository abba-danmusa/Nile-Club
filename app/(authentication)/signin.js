import React, { useState } from'react'
import { Button, Input, Text } from '@rneui/themed'
import { Link } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useSignin } from '../../hooks/queries/useAuthentication'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const { email, password, setEmail, setPassword } = useAuthStore()
  const { mutate: signin } = useSignin()
  
  const signup = () => {
    signin({email, password})
  }

  const secureTextEntry = () => {
    setShowPassword(!showPassword)
  }

  const eye = {
    true:  <AntDesign name="eyeo" size={30} color="black" />,
    false: <AntDesign name="eye" size={30} color="black" />
  }[showPassword]

  return (
    <SafeAreaView>
      <StatusBar style="auto" hidden/>
      <Text style={styles.header}>Hello</Text>
      <Text style={styles.subheader}>Sign in to your account</Text>
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder='email'
        autoCapitalize='none'
        autoCompleteType='email'
        autoCorrect={false}
        keyboardType='email-address'
        returnKeyType='next'
        leftIcon={() => <AntDesign name="user" size={30} color="black" />}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder='password'
        secureTextEntry={showPassword ? false : true}
        autoCapitalize='none'
        autoCompleteType='password'
        autoCorrect={false}
        returnKeyType='go'
        leftIcon={() => <AntDesign name="lock" size={30} color="black" />}
        rightIcon={() => {
          return (
            <TouchableOpacity
              onPress={secureTextEntry}
              style={{
                padding: 5
              }}
            >
              {eye}
            </TouchableOpacity>
          )
        }}

      />
      <Button title={'Submit'} onPress={signup}/>
      <Link href="/signup">Sign up</Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
    marginBottom: 10,
    marginTop: 100,
    alignSelf: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'center',
    color: '#333',
    fontWeight: 'bold',
  }
})