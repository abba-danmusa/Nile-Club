import { Button, Input, Text } from '@rneui/themed'
import { router } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'

export default function Signin() {
  const { email, password, setEmail, setPassword } = useAuthStore()

  const signupScreen = () => {
    router.push('/signup')
  }

  const signup = () => {
    console.log(email, password)
  }

  return (
    <>
      <Text>Sign in</Text>
      <Input label={'email'} value={email} onChangeText={setEmail}/>
      <Input label={'password'} value={password} onChangeText={setPassword}/>
      <Button title={'Submit'} onPress={signup}/>
      <Button title={'sign up'} onPress={signupScreen} />
    </>
  )
}