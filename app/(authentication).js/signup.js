import {Input, Text, Button}  from '@rneui/themed'
import { router } from 'expo-router'

export default function Signin() {
  const signinScreen = () => {
    router.back()
  }
  return (
    <>
      <Text>Sign up</Text>
      <Input label={'email'} />
      <Input label={'password'} />
      <Button title={'sign in'} onPress={signinScreen} />
    </>
  )
}