import {Input, Text, Button}  from '@rneui/themed'
import { Link } from 'expo-router'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import { useSignup } from '../../hooks/queries/useAuthentication'
import Toast from '../../utils/toast'

export default function Signup() {
  const {
    firstName,
    lastName,
    email,
    password,
    department,
    year,
    confirmPassword,
    setEmail,
    setPassword,
    setDepartment,
    setYear,
    setFirstName,
    setLastName,
    setConfirmPassword
  } = useAuthStore()

  const { mutate: signup } = useSignup()

  const signinScreen = () => {
    router.back()
  }

  const submit = () => {
    if (password !== confirmPassword) {
      Toast('Passwords do not match')
      return
    }
    signup({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      department,
      year
    })
  }

  return (
    <>
      <Text>Sign up</Text>
      <Input
        label={'First Name'}
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        label={'Last Name'}
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        label={'Email'}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label={'Department'}
        value={department}
        onChangeText={setDepartment}
      />
      <Input
        label={'Year'}
        value={year}
        onChangeText={setYear}
      />
      <Input label={'password'} value={password} onChangeText={setPassword} />
      <Input
        label={'confirm password'}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title={'Submit'} onPress={submit} />
      <Link href="/signin">Sign up</Link>
      <Link href={'/resend'}>Resend Verification Code</Link>

    </>
  )
}