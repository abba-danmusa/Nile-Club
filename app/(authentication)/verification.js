import { Link } from 'expo-router'
import { Button, Input, Text } from '@rneui/themed'
import { useVerification } from '../../hooks/queries/useAuthentication';
import { useState } from 'react'

const Verification = () => {
  
  const { mutate, isSuccess } = useVerification()

  const [verificationCode, setVerificationCode] = useState('')

  const verify = () => {
    mutate({verificationCode})
  }

  return (
    <>
      <Text>Email Verification</Text>
      <Input
        label={'Verification Code'}
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Button title={'Verify Email'} onPress={verify} />
      <Link href="/signup">Sign up</Link>
    </>
  )
}

export default Verification;
