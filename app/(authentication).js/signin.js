import { Button, Input, Text } from '@rneui/themed'
import { router } from 'expo-router'

export default function Signin() {
  const signupScreen = () => {
    router.push('/signup')
  }

  return (
    <>
      <Text>Sign in</Text>
      <Input label={'email'} />
      <Input label={'password'} />
      <Button title={'sign up'} onPress={signupScreen} />
    </>
  )
}