import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native'
import CustomizedInput from '../../components/CustomizedInput'
import { Feather, AntDesign } from '@expo/vector-icons'
import BottomButton from '../../components/BottomButton'
import Loader from '../../components/Loader'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import toast from '../../utils/toast'
import { useChangePassword } from '../../hooks/queries/useAuthentication' 

const DEVICE_WIDTH = Dimensions.get('window').width;

const Security = () => {
  
  const [showPassword, setShowPassword] = useState(false)

  const { mutate, isPending } = useChangePassword()

  const {
    password,
    newPassword,
    setPassword,
    setNewPassword
  } = useAuthStore()

  const eye = {
    true: <AntDesign name="eyeo" size={30} color="black" />,
    false: <AntDesign name="eye" size={30} color="black" />
  }[showPassword]

  const secureTextEntry = () => {
    setShowPassword(!showPassword)
  }

  const changePassword = () => {
    if (!password || password == '' || !newPassword || newPassword == '') {
      return toast('Please enter your password')
    }
    mutate({password, newPassword})
  }

  return (
    <>
      { isPending && <Loader /> }
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar backgroundColor={'#fff'}/>
        <View style={styles.container}>

          <Text style={styles.title}>Change password</Text>

          <CustomizedInput
            label={'Current Password'}
            placeholder={'Your password'}
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
            label={'New Password'}
            placeholder={'Choose a new password'}
            showPassword={showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
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

          <BottomButton title={'Proceed'} handlePress={changePassword} />

        </View>
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

export default Security