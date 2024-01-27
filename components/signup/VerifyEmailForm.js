import React, {useState} from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
const DEVICE_WIDTH = Dimensions.get('window').width
const { useAuthStore } = require('../../hooks/stores/useAuthStore')
import { Feather } from '@expo/vector-icons'
import BottomButton from '../BottomButton'
import BackButton from '../BackButton'
import CodeForm from '../signup/CodeForm'
import {
  useResend,
  useVerification
} from '../../hooks/queries/useAuthentication'
import Loader from '../Loader'
import toast from '../../utils/toast'
import CodeConfirmed from './CodeConfirmed'

const EMAIL_FORM_INDEX = 0
const PASSWORD_FORM_INDEX = 2

export default function VerifyEmailForm({ scrollToScreen }) {
  
  const [codeConfirmed, setCodeConfirmed] = useState(false)
  const { email, code } = useAuthStore()
  const { mutate: verifyCode, isPending: verifyingCode } = useVerification()
  const { mutate: resendVerificationCode, isPending: resendingCode } = useResend()

  const submitVerificationCode = () => {
    if (!code || code.length !== 6 || code.includes(' ')) {
      toast('Please enter a valid verification code')
      return
    }
    verifyCode(
      { verificationCode: code },
      {
        onSuccess: () => setCodeConfirmed(true),
        onError: error => {
          if (error?.response?.status === 401) { // verification code expires
            // TODO maybe automatically resend the verification code
          }
        }
      }
    )
  }

  const resendCode = () => {
    resendVerificationCode({ email })
  }

  return (
    <>
      {
        codeConfirmed && <CodeConfirmed scrollToPasswordForm={() => {
          scrollToScreen(PASSWORD_FORM_INDEX)
          setCodeConfirmed(false)
        }} />
      }
      { (verifyingCode || resendingCode) && <Loader/> }
      <BackButton handlePress={ () => scrollToScreen(EMAIL_FORM_INDEX) } />

      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <Text
          style={styles.description}
        >
          Please check your inbox and tap the link in the email we just sent to:
        </Text>
        <CodeForm/>
        <View style={styles.emailContainer}>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity onPress={resendCode}>
            <Text style={styles.resendText}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.resendTimerContainer}>
          <Feather name="alert-circle" size={15} color="black" />
          <Text style={styles.resendTimerText}>You can request a new code after</Text>
          <Text style={styles.resendTimer}>1:00</Text>
        </View>
        <BottomButton
          title={'Confirm Verification'}
          handlePress={submitVerificationCode}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: DEVICE_WIDTH,
    height: '100%',
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 30,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins',
    marginBottom: 50,
    alignSelf: 'flex-start',
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, 
  },
  email: {
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  resendText: {
    // alignSelf: 'flex-end',
    color: '#365486',
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
  },
  resendTimerContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSizeSize: 12,
    marginTop: 17,
  },
  resendTimerText: {
    marginHorizontal: 2,
  },
  resendTimer: {
    color: '#365486',
  }
})