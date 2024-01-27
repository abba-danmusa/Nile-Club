import React, { useState } from'react'
import { Button, Input, Text } from '@rneui/themed'
import { Link } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useSignin } from '../../hooks/queries/useAuthentication'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
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
        rightIcon={() => 
          <TouchableOpacity onPress={secureTextEntry} style={{padding: 5}}>
            {eye}
          </TouchableOpacity>
        }

      />
      
      <TouchableOpacity
        onPress={() => { }}
        style={{ alignSelf: 'flex-end', marginBottom: 100 }}
      >
        <Text>Forgot your password?</Text>
      </TouchableOpacity>
      {/* <Link href="/signup" style={{ alignSelf: 'flex-end', }}>
        <View style={styles.signupLink}>
          <View style={{marginRight: 10}}>
            <Text style={{fontSize: 30}}>Sign up</Text>
          </View>
          <View style={styles.signupArrow}>
            <AntDesign name="arrowright" style={{alignSelf: 'center'}} size={30} color="white" />
          </View>
        </View>
      </Link> */}
      <Button title={'Submit'} onPress={signup} />
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
  },
  signupLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupArrow: {
    display: 'flex',
    justifyContent: 'center',
    width: 65,
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
  }
})