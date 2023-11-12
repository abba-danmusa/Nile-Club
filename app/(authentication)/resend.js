import { Link } from 'expo-router'
import { Button, Input, Text } from '@rneui/themed'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useResend } from '../../hooks/queries/useAuthentication';

const Resend = () => {
  const { email, setEmail } = useAuthStore()
  const { mutate } = useResend()
  const resend = () => {
    mutate({email})
  }

  return (
    <>
      <Text>Resend Verification Code</Text>
      <Input label={'email'} value={email} onChangeText={setEmail} />
      <Button title={'Submit'} onPress={resend} />
      <Link href="/signup">If you haven't already, Sign up</Link>
    </>
  );
}

export default Resend;
