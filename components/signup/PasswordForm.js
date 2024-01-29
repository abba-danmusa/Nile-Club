import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CustomizedInput from '../CustomizedInput';
import { Feather, AntDesign } from '@expo/vector-icons'
import BottomButton from '../BottomButton';

const DEVICE_WIDTH = Dimensions.get('window').width;

const PasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const eye = {
    true: <AntDesign name="eyeo" size={30} color="black" />,
    false: <AntDesign name="eye" size={30} color="black" />
  }[showPassword]

  const secureTextEntry = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Create your password</Text>

      <CustomizedInput
        label={'Password'}
        placeholder={'Choose a password'}
      />

      <Text style={styles.passwordSuggestion}>
        Password should be at least 8 characters, containing
        a letter and  a number
      </Text>

      <CustomizedInput
        label={'Confirm Password'}
        placeholder={'Re-write your password'}
        showPassword={showPassword}
        // rightIcon={() =>
        //   <TouchableOpacity onPress={secureTextEntry} style={{ padding: 5 }}>
        //     {eye}
        //   </TouchableOpacity>
        // }
      />

      <View style={styles.alertContainer}>
        <Feather name="alert-circle" size={15} color="black" />
        <Text style={styles.alertText}>
          Make sure passwords are matching
        </Text>
      </View>

      <BottomButton title={'Proceed'} />

    </View>
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