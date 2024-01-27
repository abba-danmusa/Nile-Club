import React, { useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Keyboard, TouchableOpacity, AppState } from 'react-native'
import { useAuthStore } from '../../hooks/stores/useAuthStore'
import * as Clipboard from 'expo-clipboard'
import toast from '../../utils/toast';

const CodeForm = () => {
  const inputRefs = useRef(Array(6).fill(null))
  const {code, setCode} = useAuthStore()

  const handleCodeChange = (text, index) => {
    if (text.length <= 1) {
      let newCode = [...code]  // Copy the existing code

      // Update the specific index with the new input
      newCode[index] = text;

      // Update the code state
      setCode(newCode.join(''))

      if (text.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleBackspace = (index) => {
    if (index > 0) {
      let newCode = [...code];

      // Clear the current input
      newCode[index] = '';

      // Update the code state
      setCode(newCode.join(''));

      // Move focus back to the previous input
      inputRefs.current[index - 1]?.focus();

      // Set the cursor at the end of the previous input
      inputRefs.current[index - 1]?.setSelection(1);
    } else if (index === 0) {
      // Clear the first input if it is focused
      let newCode = [...code];
      newCode[0] = '';

      // Update the code state
      setCode(newCode.join(''));
    }
  }

  const handlePaste = (event, index) => {
    const pastedText = event.nativeEvent.text;

    if (pastedText.length <= 6 - index) {
      let newCode = [...code]

      for (let i = 0; i < pastedText.length; i++) {
        newCode[index + i] = pastedText[i]
      }

      setCode(newCode.join(''))
    }
  }

  const handleAppStateChange = (nextAppState) => {

    if (nextAppState == 'active') {

      Clipboard.getStringAsync().then((content) => {
        if (content && content.length == 6) {
          setCode(content)
        }
      }).catch(e => {
        toast('Something went wrong while pasting the code')
      })
    }

  }

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange)
    return async() => {
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  return (
    <View style={styles.container}>
      {Array.from({ length: 6 }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => inputRefs.current[index]?.focus()}>
          <TextInput
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={code[index] || ''}
            onChangeText={(text) => handleCodeChange(text, index)}
            onKeyPress={(e) => e.nativeEvent.key === 'Backspace' && handleBackspace(index)}
            onPaste={(e) => handlePaste(e, index)}
          />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  input: {
    width: 40,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
});

export default CodeForm