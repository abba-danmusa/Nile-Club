import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function TextArea({
  value = '',
  onChangeText = () => { },
  placeholder = 'Provide a detail description of your club here',
  title=''
}) {
  return (
    <View>
      {
        title ? 
          <Text style={styles.inputLabel}>{title}</Text>
        : null
      }
      <TextInput
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        cursorColor='#263B5E'
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        numberOfLines={10}
        style={styles.inputContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 0,
    padding: 0,
    paddingTop: 10,
    width: DEVICE_WIDTH - 40,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderBottomColor: '#263B5E',
    borderBottomWidth: 1.5,
    borderColor: '#263B5E',
    borderRadius: 12,
    fontFamily: 'Poppins',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#252427',
    fontWeight: '400',
  },
})