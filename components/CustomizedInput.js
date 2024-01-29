import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function CustomizedInput({...props}) {
  const {
    value,
    onChangeText,
    label,
    placeholder,
    autoComplete,
    autoCapitalize,
    returnKeyType,
    autoCorrect,
    keyboardType,
    rightIcon,
    showPassword,
  } = props

  return (
    <Input
      focusable={true}
      placeholder={placeholder}
      label={label}
      onChangeText={onChangeText}
      value={value}
      autoComplete={autoComplete}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      returnKeyType={returnKeyType}
      style={styles.input}
      labelStyle={styles.inputLabel}
      containerStyle={styles.inputMainContainer}
      inputContainerStyle={styles.inputContainer}
      rightIcon={rightIcon}
      secureTextEntry={showPassword}
    />
  )
}

const styles = StyleSheet.create({
  inputMainContainer: {
    alignContent: 'flex-start',
    width: DEVICE_WIDTH - 40,
    height: 85,
    paddingLeft: 0,
    marginBottom: 0,
  },
  inputContainer: {
    borderBottomWidth: 0,
    margin: 0,
    padding: 0,
    paddingTop: 5,
    width: DEVICE_WIDTH - 40,

  },
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#252427',
  },
  input: {
    fontFamily: 'Poppins',
    fontSize: 14,
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#263B5E',
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 10,
  }, 
})