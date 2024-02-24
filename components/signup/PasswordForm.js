import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CustomizedInput from '../CustomizedInput';
import { Feather, AntDesign } from '@expo/vector-icons'
import BottomButton from '../BottomButton';
import { useCreatePassword } from '../../hooks/queries/useAuthentication';
import Loader from '../Loader'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import toast from '../../utils/toast';
import SuccessScreen from '../SuccessScreen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ABOUT_FORM_INDEX = 3
const EMAIL_FORM_INDEX = 0

const PasswordForm = ({scrollToScreen}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showSuccessScreen, setShowSuccessScreen] = useState(false)
  
  const { mutate: createPassword, isPending } = useCreatePassword()
  const {
    email,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword
  } = useAuthStore()

  const eye = {
    true: <AntDesign name="eyeo" size={30} color="black" />,
    false: <AntDesign name="eye" size={30} color="black" />
  }[showPassword]

  const secureTextEntry = () => {
    setShowPassword(!showPassword)
  }

  const submitPassword = () => {
    if (!password || password == '') {
      return toast('Please enter your password')
    }
    if (password !== confirmPassword) {
      return toast('Passwords do not match')
    }

    createPassword(
      { email, password },
      {
        onSuccess: () => setShowSuccessScreen(true),
        onError: error => {
          if (error?.response?.status === 404) { // email not found
            toast(error?.response?.data.message || error.message)
            scrollToScreen(EMAIL_FORM_INDEX)
          }
        }
      }
    )
  }

  return (
    <>
      { isPending && <Loader /> }
      {
        showSuccessScreen &&
        <SuccessScreen
          title={'Password created'}
          description={'Your Password has been created'}
          scrollToScreen={() => {
            scrollToScreen(ABOUT_FORM_INDEX)
            setShowSuccessScreen(false)
          }}
        />
      }

      <View style={styles.container}>
        
        <Text style={styles.title}>Create your password</Text>

        <CustomizedInput
          label={'Password'}
          placeholder={'Choose a password'}
          value={password}
          showPassword={showPassword}
          onChangeText={setPassword}
          autoComplete={'new-password'}
          rightIcon={() =>
            <TouchableOpacity onPress={secureTextEntry} style={{ padding: 5 }}>
              {eye}
            </TouchableOpacity>
          }
        />

        <Text style={styles.passwordSuggestion}>
          Password should be at least 8 characters, containing
          a letter and  a number
        </Text>

        <CustomizedInput
          label={'Confirm Password'}
          placeholder={'Re-write your password'}
          showPassword={showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete={'new-password'}
          rightIcon={() =>
            <TouchableOpacity onPress={secureTextEntry} style={{ padding: 5 }}>
              {eye}
            </TouchableOpacity>
          }
        />

        <View style={styles.alertContainer}>
          <Feather name="alert-circle" size={15} color="black" />
          <Text style={styles.alertText}>
            Make sure passwords are matching
          </Text>
        </View>

        <BottomButton title={'Proceed'} handlePress={submitPassword} />

      </View>
    </>
  );
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
    marginBottom: 30,
  },
  passwordSuggestion: {
    fontSize: 11,
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  alertContainer: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    marginTop: 5,
  },
  alertText: {
    marginHorizontal: 2,
  },
})

export default PasswordForm;