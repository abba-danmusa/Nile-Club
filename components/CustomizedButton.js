import { StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { SHADOW } from '../utils/styles'

const CustomizedButton = ({
  title,
  handlePress = () => { },
  width = '100%',
  height = 24,
  color = '#fff',
  backgroundColor = '#365486',
  position
}) => {

  return <Button
    title={title}
    titleStyle={ [styles.titleStyle, { color }] }
    containerStyle={
      [
        styles.buttonContainer,
        {
          width,
          position,
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
    alignSelf: 'center',
    justifyContent: 'center',
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
    lineHeight: 10,
  }
})

export default CustomizedButton