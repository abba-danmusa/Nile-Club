import { StyleSheet, Dimensions } from 'react-native'
import { Button } from '@rneui/themed'

const SCREEN_WIDTH = Dimensions.get('window').width

const BottomButton = ({
  title,
  handlePress = () => {},
  color = '#fff',
  backgroundColor = '#365486'
}) => {

  return <Button
    title={title}
    titleStyle={{ color }}
    containerStyle={styles.buttonContainer}
    buttonStyle={{backgroundColor}}
    onPress={() => handlePress()}
  />
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    width: SCREEN_WIDTH - 30,
    borderRadius: 12,
    alignSelf: 'center'
  }
})

export default BottomButton