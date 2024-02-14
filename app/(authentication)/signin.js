import React, { useState } from'react'
import { Button, Input, Text } from '@rneui/themed'
import { Link } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useSignin } from '../../hooks/queries/useAuthentication'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import CustomizedInput from '../../components/CustomizedInput'
import BottomButton from '../../components/BottomButton'
import Loader from '../../components/Loader'

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false)
  const { email, password, setEmail, setPassword } = useAuthStore()
  const { mutate: signin, isPending } = useSignin()
  
  const submit = () => {
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
    <>
      {isPending && <Loader />}
      
      <View style={styles.container}>
        <StatusBar style='auto' />
        <Image
          source={require('../../assets/signin/signin.png')}
          style={styles.image}
        />
        <Text style={styles.header}>Login</Text>
        <CustomizedInput
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          placeholder='Enter your email address'
          autoCapitalize='none'
          autoCompleteType='email'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          leftIcon={() => <AntDesign name="user" size={30} color="black" />}
        />
        <CustomizedInput
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          placeholder='Enter your password'
          showPassword={showPassword ? true : false}
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
        <BottomButton title={'Sign In'} handlePress={submit} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 130,
    marginBottom: 28,
    alignSelf: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
    // marginTop: 100,
    alignSelf: 'center',
    color: '#333',
    fontWeight: '400',
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