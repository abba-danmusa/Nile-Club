import { Button, Input, Text } from '@rneui/themed'
import { Link } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'

export default function Signin() {
  const { email, password, setEmail, setPassword } = useAuthStore()

  const signup = () => {
    console.log(email, password)
  }

  return (
    <>
      <Text>Sign in</Text>
      <Input label={'email'} value={email} onChangeText={setEmail}/>
      <Input label={'password'} value={password} onChangeText={setPassword}/>
      <Button title={'Submit'} onPress={signup}/>
      <Link href="/signup">Sign up</Link>
    </>
  )
}