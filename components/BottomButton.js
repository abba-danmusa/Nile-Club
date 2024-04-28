import { useState, useEffect } from 'react'
import { StyleSheet, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import { Button } from '@rneui/themed'

const SCREEN_WIDTH = Dimensions.get('window').width

const BottomButton = ({
  title,
  handlePress = () => {},
  color = '#fff',
  backgroundColor = '#365486'
}) => {
  
  const [keyboard, setKeyboard] = useState(false)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {setKeyboard(true)})
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {setKeyboard(false)})

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  if (!keyboard) {
    return <Button
      title={title}
      titleStyle={{ color }}
      containerStyle={styles.buttonContainer}
      buttonStyle={{ backgroundColor }}
      onPress={handlePress}
    />
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: SCREEN_WIDTH - 30,
    borderRadius: 12,
    alignSelf: 'center'
  }
})

export default BottomButton