import { StyleSheet } from 'react-native'
import { Button } from '@rneui/themed'
import { SHADOW } from '../utils/styles'

const CustomizedButton = ({
  title,
  handlePress = () => { },
  width = '100%',
  height = 30,
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
          height,
          position,
          bottom: position == 'absolute' ? 8 : '',
        }
      ]
    }
    buttonStyle={{ backgroundColor }}
    onPress={() => handlePress()}
  />
}

const styles = StyleSheet.create({
  buttonContainer: {
    ...SHADOW,
    borderRadius: 12,
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
  }
})

export default CustomizedButton