import {Input, Text, Button}  from '@rneui/themed'
import { router } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'

export default function Signin() {
  const {
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword
  } = useAuthStore()

  const signinScreen = () => {
    router.back()
  }

  const submit = () => {
    console.log(email, password, confirmPassword)
  }

  return (
    <>
      <Text>Sign up</Text>
      <Input label={'email'} value={email} onChangeText={setEmail} />
      <Input label={'password'} value={password} onChangeText={setPassword} />
      <Input label={'confirm password'} value={confirmPassword} onChangeText={setConfirmPassword} />
      <Button title={'Submit'} onPress={submit} />
      <Button title={'sign in'} onPress={signinScreen} />
    </>
  )
}