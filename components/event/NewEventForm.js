import { Text, StyleSheet, Dimensions, View } from 'react-native'
import CustomizedInput from '../../components/CustomizedInput'
import TextArea from '../../components/TextArea'
import { useEventStore } from '../../hooks/stores/useEventStore'
import BottomButton from '../../components/BottomButton'
import { CheckBox } from '@rneui/themed'

const EVENT_DETAIL_SCREEN = 1
const DEVICE_WIDTH = Dimensions.get('window').width

const NewEventForm = ({ scrollToScreen = () => { } }) => {

  const {
    title, 
    description,
    virtual,
    physical,
    setVirtual,
    setPhysical,
    setTitle,
    setDescription,
  } = useEventStore()

  const submitEventForm = () => {
    scrollToScreen(EVENT_DETAIL_SCREEN)
  }

  return (
    <>
      <Text style={styles.title}>Add New Event</Text>
      <CustomizedInput
        placeholder={'Event Title'}
        value={title}
        onChangeText={setTitle}
        autoCorrect={true}
        autoCapitalize='sentences'
        autoComplete='additional-name'
        height={50}
      />
      <TextArea
        value={description}
        onChangeText={setDescription}
      />

      <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginTop: 10}}>
        <CheckBox
          center
          title="Virtual Event"
          checked={virtual}
          onPress={() => setVirtual(!virtual)}
          disabled={physical ? true : false}
          fontFamily='Poppins'
        />
        <CheckBox
          center
          title="Physical Event"
          checked={physical}
          onPress={() => setPhysical(!physical)}
          disabled={virtual ? true : false}
          fontFamily='Poppins'
        />
      </View>
      <BottomButton title={'Next'} handlePress={submitEventForm} />
    </>
  )
}

const styles = StyleSheet.create({
  indicatorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    top: 50,
    zIndex: 1,
    alignSelf: 'center'
  },
  indicatorStyle: {
    width: 27,
    height: 6,
    backgroundColor: '#365486',
    borderRadius: 10
  },
  slideContainer: {
    flex: 1,
    width: DEVICE_WIDTH,
    backgroundColor: '#FDFEFF',
    alignItems: 'center',
    gap: 10,
    height: '100%',
    backgroundColor: 'red',

  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 50
  },
})

export default NewEventForm