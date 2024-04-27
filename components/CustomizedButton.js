import { StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { SHADOW } from '../utils/styles'

const CustomizedButton = ({
  title,
  handlePress = () => { },
  width = '100%',
  height = 24,
  lineHeight = 10,
  color = '#fff',
  alignSelf = 'center',
  justifyContent = 'center',
  backgroundColor = '#365486',
  position,
  borderWidth = 0,
  borderColor
}) => {

  return <Button
    title={title}
    titleStyle={ [styles.titleStyle, { color, lineHeight }] }
    containerStyle={
      [
        styles.buttonContainer,
        {
          width,
          position,
          alignSelf,
          justifyContent,
          borderWidth,
          borderColor,
          bottom: position == 'absolute' ? 5 : '',
        }
      ]
    }
    buttonStyle={
      [
        styles.buttonStyle,
        {
          width,
          backgroundColor,
          height
        }
      ]
    }
    onPress={() => handlePress()}
  />
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 12,
    alignItems: 'center',
    height: 'fit-content',
    width: 'fit-content',
  },
  buttonStyle: {
    ...SHADOW,
    borderRadius: 12,
  },
  titleStyle: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
  }
})

export default CustomizedButton